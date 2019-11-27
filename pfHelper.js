import ResizeManager from './Operations/resizeManager';
import ObjectRegister from './Operations/objectRegister';

class PFHelper {
    constructor(config) {
        this.importHelper = function (module) {
            let list = Object.getOwnPropertyNames(module);
            let logObj = {};
            for (let i = 2; i < list.length - 1; i++) {
                logObj[`property${i - 2}`] = list[i];
            }
            for (let p in logObj) {
                this[logObj[p]] = module[logObj[p]];
            }
        }

        this.game = config.game;
        let scenes = this.game.scene.getScenes(false);

        for (let i = 0; i < scenes.length; i++) {
            scenes[i].resizeManager = new ResizeManager();
            scenes[i].objectRegister = new ObjectRegister(scenes[i]);
            if (i == 0) {
                this.scene = scenes[i];
            } else if (i == 1) {
                this.ui = scenes[i];
            }
        }

        if (config.colors)
            this.importHelper(require('./Graphics/colorsHelper').default);

        if (config.maths)
            this.importHelper(require('./Maths/mathsHelper').default);

        if (config.dynamicTween) {
            this.dynamicTween = require('./Operations/dynamicTween').default;
        }

        if (config.timer)
            this.timer = require('./Operations/timer').default

        if (config.tweenTrain) {
            this.tweenTrain = require('./Operations/tweenTrain').default;
        }

        if (config.animations)
            this.importHelper(require('./Graphics/animationsHelper').default);


        if (config.utility)
            this.importHelper(require('./Operations/utilityHelper').default);

        if (config.objectPositioner) {
            if (this.scene) {
                this.scene.objectPositioner = require('./Graphics/objectPositioner').default;
            }

            if (this.ui) {
                this.ui.objectPositioner = require('./Graphics/objectPositioner').default;
            }
        }

        this.resize = function () {
            if (this.scene) {
                this.scene.resizeManager.resize();
            }

            if (this.ui) {
                this.ui.resizeManager.resize();
            }

            if (this.tweenTrain) this.tweenTrain.resize();
        }
    }
}

export default PFHelper;