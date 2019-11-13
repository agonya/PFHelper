class ResizeManager {
	constructor() {
		this.objects = [];
	}

	add(object, resizeFunction) {
		this.objects.push(object);
		object.resize = resizeFunction;
		object.resize();
	}

	remove(object) {
		for (let i = this.objects.length - 1; i >= 0; i--) {
			if (this.objects[i] == object) {
				this.objects.splice(i, 1);
			}
		}
	}

	resize() {
		for (let i = 0; i < this.objects.length; i++) {
			this.objects[i].resize();
		}
	}
}

export default ResizeManager;