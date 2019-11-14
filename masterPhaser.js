let colorsHelper, graphicsHelper;
let sds;
class MasterPhaser {

    constructor(config) {
        if (config.scene)
            this.scene = config.scene;

        if (config.ui)
            this.ui = scenes.ui;

        if (config.colors)
            this.importHelper(require('./Graphics/colorsHelper').default);

        if (config.graphics)
            this.importHelper(require('./Graphics/graphicsHelper').default.prototype);

        if (config.maths)
            this.importHelper(require('./Maths/mathsHelper').default);

        if (config.operations)
            this.importHelper(require('./Operations/operationsHelper').default);



        // Utility Helper - ObjectRegister, dynamic tween, resizeManager, timer yok

    }

    importHelper(module) {
        let list = Object.getOwnPropertyNames(module);
        let logObj = {};
        for (let i = 3; i < list.length - 1; i++) {
            logObj[`property${i-2}`] = list[i];
        }
        for (let p in logObj) {
            this[logObj[p]] = module[logObj[p]];
        }
    }

}

export default MasterPhaser;