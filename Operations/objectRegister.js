class ObjectRegister {

    constructor(scene) {
        this.scene = scene;
        this.objects = {}
    }

    registerImage(segment = "game", name = "temp", atlas = false, key, position = function () {
        return {
            x: 0,
            y: 0
        }
    }, scale = function () {
        return 1;
    }) {
        let tempImage = ObjectRegister.scene.add.image(0, 0, `${atlas ? `"atlas", ${key}` : `${key}`}`);
        tempImage.name = name;
        tempImage.getResizeScale = function () {
            return scale();
        }
        tempImage.getResizePos = function () {
            return {
                x: position().x,
                y: position().y
            }
        }
        this.scene.resizeManager.add(tempImage, function () {
            this.setScale(this.getResizeScale());
            this.x = this.getResizePos().x;
            this.y = this.getResizePos().y;

            this.bounds = this.getBounds();
        })

        ObjectRegister.objects[`${segment}${name.charAt(0).toUpperCase() + name.slice(1)}`] = tempImage;
    }

    getObject(segment, name) {
        return ObjectRegister.objects[`${segment}${name.charAt(0).toUpperCase() + name.slice(1)}`];
    }
}

export default ObjectRegister;