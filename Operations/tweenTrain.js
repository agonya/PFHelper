class TweenTrain {
	static create(scene) {
		let train = new TweenTrain(scene);
		for (let i = 0; i < this.allTrains.length; i++) {
			if (this.allTrains[i].finished) {
				this.allTrains[i] = train;
				return train;
			}
		}
		this.allTrains.push(train);
		return train;
	}

	static resize() {
		for (let i = this.allTrains.length - 1; i >= 0; i--) {
			if (!this.allTrains[i].finished) {
				this.allTrains[i].resize();
			}
		}
	}

	constructor(scene) {
		this.scene = scene;
		this.train = [];
		this.currentTween = false;
		this.finished = false;
		this.isLooping = false;
		this.oldTargetValues = false;
		this.resizeCount = 0;
	}

	setLooping(isLooping) {
		this.isLooping = !!isLooping;
		return this;
	}

	add(configGetter) {
		this.train.push(configGetter);
		return this;
	}

	addParallel(trains) {
		this.train.push({
			parallelTrains: trains
		});
		return this;
	}

	addDelay(delay) {
		this.train.push({
			trainDelay: delay
		});
		return this;
	}

	addEvent(eventFunction) {
		this.train.push({
			trainEvent: eventFunction
		});
		return this;
	}

	run() {
		if (this.train.length > 0) {
			let currentTask = this.train[0];
			if (currentTask.trainDelay != undefined) {
				let tweenTrain = this;
				let delay = currentTask.trainDelay;
				this.scene.time.addEvent({
					delay: (typeof (delay) == "function") ? delay() : delay,
					callback: function () {
						tweenTrain.runNext();
					}
				});
			} else if (currentTask.trainEvent != undefined) {
				currentTask.trainEvent();
				this.runNext();
			} else if (currentTask.parallelTrains != undefined) {
				this.remainingChildren = currentTask.parallelTrains.length;
				for (let i = 0; i < currentTask.parallelTrains.length; i++) {
					let childTrain = currentTask.parallelTrains[i];
					childTrain.parentTrain = this;
					childTrain.run();
				}
			} else {
				let config = currentTask();
				let invalidTween = !config.targets || (Array.isArray(config.targets) && config.targets.length == 0);
				if (invalidTween) {
					this.runNext();
				} else {
					let tweenTrain = this;
					if (config.onComplete) {
						let oldFunction = config.onComplete;
						config.onComplete = function () {
							oldFunction();
							tweenTrain.currentTween = false;
							tweenTrain.runNext();
						}
					} else {
						config.onComplete = function () {
							tweenTrain.currentTween = false;
							tweenTrain.runNext();
						}
					}

					let getProps = function () {
						if (tweenTrain.oldTargetValues && tweenTrain.resizeCount > 0) {
							for (let props of tweenTrain.oldTargetValues) {
								if (Array.isArray(config.targets)) {
									for (let t of config.targets) {
										if (props.target === t) {
											t[props.key] = props.start;
										}
									}
								} else {
									if (props.target === config.targets) {
										config.targets[props.key] = props.start;
									}
								}

							}
						}
					}

					if (config.onStart) {
						let oldOnStart = config.onStart;
						config.onStart = function () {
							oldOnStart();
							getProps();
						}

					} else {
						config.onStart = function () {
							getProps();
						}
					}

					this.currentTween = this.scene.tweens.add(config);
					this.currentTween.onStop = config.onStop || function () {};
					this.currentTween.resizeAction = config.resizeAction || "restart";

					if (!this.oldTargetValues) {
						this.oldTargetValues = [];
						this.invalidValues = ["x", "y", "scale", "scaleX", "scaleY"];
						for (let data of this.currentTween.data) {
							if (!this.invalidValues.includes(data.key)) {
								this.oldTargetValues.push(data);
							}
						}
					}
				}
			}
		} else {
			this.finished = true;
			if (this.parentTrain) {
				this.parentTrain.remainingChildren--;
				if (this.parentTrain.remainingChildren == 0) {
					this.parentTrain.runNext();
				}
			}
		}
	}

	runNext() {
		if (this.finished) return;
		let removed = this.train.shift();
		if (this.isLooping) this.train.push(removed);
		this.run();
	}

	resize() {
		if (this.currentTween) {
			this.resizeCount++;
			if (this.currentTween.resizeAction == "nothing") {} else if (this.currentTween.resizeAction == "skip") {
				this.currentTween.onStop();
				this.currentTween.stop();
				this.currentTween = false;
				this.runNext();
			} else {
				this.currentTween.onStop();
				this.currentTween.stop();
				this.run();
			}
		}
	}

	skipToNext() {
		if (this.currentTween) {
			this.currentTween.onStop();
			this.currentTween.stop();
			this.currentTween = false;
			this.runNext();
		}
	}

	skipToLast() {
		if (this.currentTween) {
			this.currentTween.onStop();
			this.currentTween.stop();
			this.currentTween = false;
			this.train.splice(0, this.train.length - 1);
			this.run();
		}
	}

	kill() {
		if (this.currentTween) {
			this.currentTween.onStop();
			this.currentTween.stop();
			this.currentTween = false;
		}
		this.train = [];
		this.run();
	}
}

TweenTrain.allTrains = [];

export default TweenTrain;