class ObjectRegister {

    constructor(scene) {
        this.scene = scene;
        this.objects = {}
    }

    registerObj(segment = "game", name = "temp", obj) {
        let tempObject = obj;
        tempObject.name = name;

        this.objects[`${segment}${name.charAt(0).toUpperCase() + name.slice(1)}`] = tempObject;
    }

    registerImage(segment = "game", name = "temp", atlas = false, key, scale = function () {
        return 1;
    }, position = function () {
        return {
            x: 0,
            y: 0
        }
    }) {
        let tempImage;
        if (atlas) {
            tempImage = ObjectRegister.scene.add.image(0, 0, "atlas", key);
        } else {
            tempImage = ObjectRegister.scene.add.image(0, 0, key);
        }
        tempImage.name = name;
        tempImage.getResizeScale = scale;
        tempImage.getResizePos = position;
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