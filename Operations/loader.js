class Loader {
	constructor(textureManager) {
		this.textureManager = textureManager;

		this.numAssets = 0;
		this.numLoaded = 0;
		this.completeFunc = null;
	}

	assetLoaded() {
		this.numLoaded++;
		if (this.completeFunc != null && this.numLoaded == this.numAssets) {
			this.completeFunc();
		}
	}

	onComplete(func) {
		this.completeFunc = func;
		if (this.numLoaded == this.numAssets) {
			this.completeFunc();
		}
	}

	loadImage(key, b64) {
		this.numAssets++;
		this.textureManager.addBase64(key, b64);
		this.assetLoaded();
	}

	loadAtlas(key, b64, json) {
		this.numAssets++;

		let image = new Image();
		image.src = b64;
		image.onload = () => {
			this.textureManager.addAtlasJSONArray(key, image, json);
			this.assetLoaded();
		};
	}

	loadSpriteSheet(key, b64, frameWidth, frameHeight) {
		this.numAssets++;

		let image = new Image();
		image.src = b64;
		image.onload = () => {
			this.textureManager.addSpriteSheet(key, image, {
				frameWidth: frameWidth,
				frameHeight: frameHeight
			});
			this.assetLoaded();
		};
	}

	static loadFont(xmlCache, key, json) {
		let getAttribute = function (id) {
			for (let prop in this) {
				if (prop == id) {
					return this[prop];
				}
			}
		};

		json.getElementsByTagName = (id) => {
			let elements = [];
			for (let prop in json) {
				let val = json[prop];
				if (prop == id) {
					val.getAttribute = getAttribute.bind(val);
					elements.push(val);
				}
				if (typeof val == "object") {
					for (let prop2 in val) {
						let val2 = val[prop2];
						if (prop2 == id) {
							val2.getAttribute = getAttribute.bind(val2);
							elements.push(val2);
							if (id == "char") {
								for (let v of val2) {
									v.getAttribute = getAttribute.bind(v);
								}
								return val2;
							}
						}
					}
				}
			}
			return elements;
		};

		xmlCache.add(key, json);
	}
}

export default Loader;