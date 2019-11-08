class Timer {
	// this is how you should always create a new timer
	static create() {
		let timer = new Timer();
		this.allTimers.push(timer);
		return timer;
	}
	
	static pauseAll() {
		for (let i=0; i<this.allTimers.length; i++) {
			this.allTimers[i].pause();
		}
	}
	
	static resumeAll() {
		for (let i=0; i<this.allTimers.length; i++) {
			this.allTimers[i].resume();
		}
	}
	
	constructor() {
		this.startTime = new Date().getTime();
		this.elapsedTime = 0;
		this.paused = false;
		this.stopped = false;
	}
	
	getElapsedTime() {
		if (this.stopped) {
			return 0;
		} else if (this.paused) {
			return this.elapsedTime;
		} else {
			return this.elapsedTime + (new Date().getTime() - this.startTime);
		}
	}
	
	pause() {
		if (this.paused) return;
		this.paused = true;
		this.elapsedTime += (new Date().getTime() - this.startTime);
	}
	
	resume() {
		if (!this.paused) return;
		this.paused = false;
		this.startTime = new Date().getTime();
	}
	
	reset() {
		this.startTime = new Date().getTime();
		this.elapsedTime = 0;
		this.stopped = false;
	}
	
	rewind(milliseconds) {
		this.elapsedTime -= milliseconds;
		if (this.elapsedTime < 0) this.elapsedTime = 0;
	}
	
	fastForward(milliseconds) {
		this.elapsedTime += milliseconds;
	}
	
	stop() {
		this.stopped = true;
	}
}

Timer.allTimers = [];

export default Timer;
