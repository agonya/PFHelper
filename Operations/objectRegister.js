/**
 * @classdesc
 * One instance per scene is automatically created when PFHelper is imported.
 * ObjectRegister is responsible for keeping track of objects, automatically asigning them resize functions
 * and most importantly, gives them names.
 *
 * @class ObjectRegister
 * @constructor
 * 
 * @author Tayfun Turgut <tyfn.trgt@gmail.com>
 * 
 * @memberof PFHelper
 */
class ObjectRegister {

    /**
     * @description Creates an instance of ObjectRegister.
     * 
     * @param {Phaser.Scene} scene
     * 
     * @memberof ObjectRegister
     */
    constructor(scene) {
        this.scene = scene;
        this.objects = {}
    }

    /**
     * @description Register an object. Note that you must provide the object with its resize function for full functionality. <br>
     * Registers objects with the following format: "segmentName". <br>
     * You can manually get the objects array from: Phaser Scene => objectRegister => {object} objects
     *
     * @param {string} [segment="game"]
     * @param {string} [name="temp"]
     * @param {object} obj
     * @returns {(object|boolean)}
     * 
     * @memberof ObjectRegister
     */
    registerObj(segment = "game", name = "temp", obj) {
        if ((typeof segment) != "string") {
            console.warn(`ObjectRegister.registerObj : Segment must be of type "string"!
            Log => segment: ${segment}`);
            return false;
        } else {
            if ((typeof name) != "string") {
                console.warn(`ObjectRegister.registerObj : Name must be of type "string"!
                Log => name: ${name}`);
                return false;
            } else {
                if ((typeof obj) != "object") {
                    console.warn(`ObjectRegister.registerObj : Object must be of type "object"!
                    Log => obj: ${obj}`);
                    return false;
                }
            }
        }

        let tempObject = obj;
        tempObject.name = name;

        this.objects[`${segment}${name.charAt(0).toUpperCase() + name.slice(1)}`] = tempObject;

        return tempObject;
    }

    registerImage(config = {
        segment: "game",
        name: "temp",
        atlas: false,
        key: "",
        scale: function () {
            return 1;
        },
        position: function () {
            return {
                x: 0,
                y: 0
            }
        }
    }) {
        let tempImage;
        if (config.atlas) {
            tempImage = this.scene.add.image(0, 0, config.atlas, config.key);
        } else {
            tempImage = this.scene.add.image(0, 0, config.key);
        }
        tempImage.name = config.name;
        tempImage.getResizeScale = config.scale;
        tempImage.getResizePos = config.position;
        this.scene.resizeManager.add(tempImage, function () {
            this.setScale(this.getResizeScale());
            this.x = this.getResizePos().x;
            this.y = this.getResizePos().y;

            this.bounds = this.getBounds();
        })

        this.objects[`${segment}${name.charAt(0).toUpperCase() + name.slice(1)}`] = tempImage;

        return tempImage;
    }

    registerRectangle(segment = "game", name = "temp", scale = function () {
        return {
            scaleX: 1,
            scaleY: 1
        };
    }, position = function () {
        return {
            x: 0,
            y: 0
        }
    }) {
        let tempRectangle;
        tempRectangle = this.scene.add.rectangle(0, 0, 100, 100);
        tempRectangle.name = name;
        tempRectangle.getResizeScale = scale;
        tempRectangle.getResizePos = position;
        this.scene.resizeManager.add(tempRectangle, function () {
            this.scaleX = this.getResizeScale().scaleX;
            this.scaleY = this.getResizeScale().scaleY;
            this.x = this.getResizePos().x;
            this.y = this.getResizePos().y;

            this.bounds = this.getBounds();
        })

        this.objects[`${segment}${name.charAt(0).toUpperCase() + name.slice(1)}`] = tempRectangle;

        return tempRectangle;
    }

    getObject(segment, name) {
        return this.objects[`${segment}${name.charAt(0).toUpperCase() + name.slice(1)}`];
    }

    getSegment(segment) {
        let tempArr = [];
        for (const [key, value] of Object.entries(this.scene.objectRegister.objects)) {
            if (key.substr(0, segment.length) == segment) {
                tempArr = [...tempArr, value];
            }
        }
        return tempArr;
    }

    removeSegment(segment) {
        for (let t of this.getSegment(segment, this.scene.objectRegister.objects)) {
            this.scene.resizeManager.remove(t);
            t.destroy();
            for (const [key, value] of Object.entries(this.scene.objectRegister.objects)) {
                if (value == t) {
                    delete this.scene.objectRegister.objects[key];
                    break;
                }
            }
        }
    }
}

export default ObjectRegister;