/**
 * @classdesc
 * One instance per scene is automatically created when PFHelper is imported. <br>
 * ObjectRegister is responsible for keeping track of objects, automatically asigning them resize functions <br>
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
     * @param {string} [segment="game"] The segment of the object
     * @param {string} [name="temp"] The name of the object
     * @param {object} [obj={}]
     * @returns {object}
     * 
     * @memberof ObjectRegister
     */
    registerObj(config = {
        segment: "game",
        name: "temp",
        obj: {}
    }) {
        let tempObject = config.obj;
        tempObject.name = config.name;

        this.objects[`${config.segment}${config.name.charAt(0).toUpperCase() + config.name.slice(1)}`] = tempObject;

        return tempObject;
    }

    /**
     * @description Registers an image. 
     *
     * @param {string} [config={
     *         segment: "game",
     *         name: "temp",
     *         atlas: false,
     *         key: "",
     *         scale: function () {
     *             return 1;
     *         },
     *         position: function () {
     *             return {
     *                 x: 0,
     *                 y: 0
     *             }
     *         }
     *     }]
     * 
     * @returns {(object|boolean)}
     * @memberof ObjectRegister
     */
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

        this.objects[`${config.segment}${config.name.charAt(0).toUpperCase() + config.name.slice(1)}`] = tempImage;

        return tempImage;
    }

    /**
     * @description Registers a rectangle. Note that scaleX and scaleY must be given seperately to ensure the rectangle resizes correctly.
     *
     * @param {string} [config={
     *         segment: "game",
     *         name: "temp",
     *         scale: function () {
     *             return {
     *                 scaleX: 1,
     *                 scaleY: 1
     *             };
     *         },
     *         position: function () {
     *             return {
     *                 x: 0,
     *                 y: 0
     *             }
     *         }
     *     }]
     * @returns {(object|boolean)}
     * @memberof ObjectRegister
     */
    registerRectangle(config = {
        segment: "game",
        name: "temp",
        scale: function () {
            return {
                scaleX: 1,
                scaleY: 1
            };
        },
        position: function () {
            return {
                x: 0,
                y: 0
            }
        }
    }) {
        let tempRectangle;
        tempRectangle = this.scene.add.rectangle(0, 0, 100, 100);
        tempRectangle.name = config.name;
        tempRectangle.getResizeScale = config.scale;
        tempRectangle.getResizePos = config.position;
        this.scene.resizeManager.add(tempRectangle, function () {
            this.scaleX = this.getResizeScale().scaleX;
            this.scaleY = this.getResizeScale().scaleY;
            this.x = this.getResizePos().x;
            this.y = this.getResizePos().y;

            this.bounds = this.getBounds();
        })

        this.objects[`${config.segment}${config.name.charAt(0).toUpperCase() + config.name.slice(1)}`] = tempRectangle;

        return tempRectangle;
    }

    /**
     * @description Gets an object from register by segment and name.
     *
     * @param {string} [segment="game"] The segment of the object
     * @param {string} [name="temp"]
     * @returns
     * @memberof ObjectRegister
     */
    getObject(segment = "game", name = "temp") {
        return this.objects[`${segment}${name.charAt(0).toUpperCase() + name.slice(1)}`];
    }

    /**
     * @description Returns an array that contains all objects registered in the given segment.
     *
     * @param {string} [segment="game"] The segment of the object
     * @returns
     * @memberof ObjectRegister
     */
    getSegment(segment = "game") {
        let tempArr = [];
        for (const [key, value] of Object.entries(this.scene.objectRegister.objects)) {
            if (key.substr(0, segment.length) == segment) {
                tempArr = [...tempArr, value];
            }
        }
        return tempArr;
    }

    /**
     * @description Removes (removes from resizemanager and Phaserly destroys) all objects registered in the given segment.
     * Note that all these objects must be Phaser objects, so caution is advised.
     *
     * @param {string} segment The segment of the object
     * @memberof ObjectRegister
     */
    removeSegment(segment = "game") {
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