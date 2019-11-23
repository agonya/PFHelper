/**
 * @description The default resize manager used by the object register.
 * Comes with default when importing PFHelper.
 *
 * @class ResizeManager
 * 
 * @author Berke Can Gürer
 */
class ResizeManager {

	/**
	 * @description Creates an instance of ResizeManager.
	 * 
	 * @memberof ResizeManager
	 */
	constructor() {
		this.objects = [];
	}

	/**
	 * @description Adds an object to the resize manager, to the given scene.
	 *
	 * @param {object} object
	 * @param {function} resizeFunction
	 * @memberof ResizeManager
	 */
	add(object, resizeFunction) {
		this.objects.push(object);
		object.resize = resizeFunction;
		object.resize();
	}

	/**
	 * @description Removes an object from the resize manager, preferable because you want to destroy it.
	 *
	 * @param {object} object
	 * @memberof ResizeManager
	 */
	remove(object) {
		for (let i = this.objects.length - 1; i >= 0; i--) {
			if (this.objects[i] == object) {
				this.objects.splice(i, 1);
			}
		}
	}

	/**
	 * @description Run the resize function of all objects registered to this resize manager.
	 *
	 * @memberof ResizeManager
	 */
	resize() {
		for (let i = 0; i < this.objects.length; i++) {
			this.objects[i].resize();
		}
	}
}

export default ResizeManager;