/**
 *
 *
 * @export
 * @class ObjectPositioner
 */
export default class ObjectPositioner {
    /**
     *Creates an instance of ObjectPositioner.
     * @param {object} config
     * @memberof ObjectPositioner
     */
    constructor(config) {
        if (!config.scene) {
            console.log("missing scene!");
            return;
        }
        if (!config.rows) {
            config.rows = 5;
        }
        if (!config.cols) {
            config.cols = 5;
        }
        if (config.debug === undefined) {
            config.debug = true;
        }
        this.scene = config.scene;
		if(config.rows > 20) {
		this.rows = 20;
		} else if(config.rows < 5) {
			this.rows = 5;
		} else { 
		this.rows = config.rows;
		}
		if(config.cols > 20) {
		this.cols = 20;
		} else if(config.cols < 5) {
			this.cols = 5;
		} else { 
		this.cols = config.cols;
		}
		
        this.debug = config.debug;
        this.graphics = this.scene.add.graphics();
        this.numbers = [];
    }

    /**
     *
     *
     * @param {number} [a=1]
     * @param {number} w
     * @param {number} h
     * @memberof ObjectPositioner
     */
    show(a = 1, w, h) {
        if (w > h) {
            this.cw = w / this.rows;
            this.ch = h / this.cols;
        } else {
            this.cw = w / this.cols;
            this.ch = h / this.rows;
        }
        if (this.debug) {
            this.graphics.clear();
            this.graphics.lineStyle(4, 0xff0000, a);
            for (var i = 0; i < w; i += this.cw) {
                this.graphics.moveTo(i, 0);
                this.graphics.lineTo(i, h);
            }
            for (var i = 0; i < h; i += this.ch) {
                this.graphics.moveTo(0, i);
                this.graphics.lineTo(w, i);
            }
            this.graphics.strokePath();
        }
    }

    /**
     *
     *
     * @param {number} xx
     * @param {number} yy
     * @param {object} obj
     * @param {number} w
     * @param {number} h
     * @memberof ObjectPositioner
     */
    placeAt(xx, yy, obj, w, h) {
        if (w > h) {
            this.cw = w / this.rows;
            this.ch = h / this.cols;
        } else {
            this.cw = w / this.cols;
            this.ch = h / this.rows;
        }
        var x2 = this.cw * xx + this.cw / 2;
        var y2 = this.ch * yy + this.ch / 2;
        obj.x = x2;
        obj.y = y2;
    }

    /**
     *
     *
     * @param {number} [a=1]
     * @param {number} w
     * @param {number} h
     * @memberof ObjectPositioner
     */
    showNumbers(a = 1, w, h) {
        this.show(a, w, h);
        var n = 0;
        if (this.debug) {
            if (w > h) {
                for (var i = 0; i < this.cols; i++) {
                    for (var j = 0; j < this.rows; j++) {
                        var numText = this.scene.add.text(0, 0, n, {
                            color: 'red',
							fontSize: 36
                        });
                        numText.setOrigin(0.5, 0.5);
                        this.placeAt(j, i, numText, w, h);
                        n++;
                        this.numbers.push(numText);
                    }
                }
            } else {
                for (var i = 0; i < this.rows; i++) {
                    for (var j = 0; j < this.cols; j++) {
                        var numText = this.scene.add.text(0, 0, n, {
                            color: 'red',
							fontSize: 36
                        });
                        numText.setOrigin(0.5, 0.5);
                        this.placeAt(j, i, numText, w, h);
                        n++;
                        this.numbers.push(numText);
                    }
                }
            }
        }
    }

    /**
     * @description Object Positioner is a helper that uses grids to position an object to a specific index.
     *
     * @param {number} index
     * @param {object} obj
     * @param {number} [scale=1]
     * @param {number} w
     * @param {number} h
     * @memberof ObjectPositioner
     */
    placeAtIndex(index, obj, scale = 1, w, h) {
        var yy, xx;
        if (w > h) {
            yy = Math.floor(index / this.rows);
            xx = index - (yy * this.rows);
            this.placeAt(xx, yy, obj, w, h);
            if (obj.type === "Container") {
                obj.setScale((h * scale / this.cols) / obj.getBounds().height)
            } else {
                obj.displayHeight = h * scale / this.cols;
                obj.scaleX = obj.scaleY;
            }
        } else {
            yy = Math.floor(index / this.cols);
            xx = index - (yy * this.cols);
            this.placeAt(xx, yy, obj, w, h);

            if (obj.type === "Container") {
                obj.setScale((w * scale / this.cols) / obj.getBounds().width)
            } else {
                obj.displayWidth = w * scale / this.cols;
                obj.scaleY = obj.scaleX;
            }
        }
    }

     resize(w, h) {
        while (this.numbers.length > 0) {
            let e = this.numbers.pop();
            e.destroy();
        }
        this.showNumbers(1, w, h);
    }

}