import {
    eventNames
} from "cluster"
import {
    triggerAsyncId
} from "async_hooks";

class ObjectRegister {

    constructor(scene) {
        this.scene = scene;
        this.objects = {}
    }

    createResizeFunc(obj) {

    }

    registerImage(segment, name, atlas, key, resize) {
        let tempImage = this.scene.add.image(0, 0, `${atlas ? `"atlas", ${key}` : `${key}`}`);
        tempImage.name = name;
        this.scene.resizeManager.add(tempImage, function () {
            resize(this);

            this.bounds = this.getBounds();
        })

        this.objects[`${segment}${name.charAt(0).toUpperCase() + name.slice(1)}`] = tempImage;
    }

    getObject(segment, name) {

    }
}

export default ObjectRegister;