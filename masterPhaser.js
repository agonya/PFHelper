class MasterPhaser {
    constructor(config) {
        this.importHelper = function (module) {
            let list = Object.getOwnPropertyNames(module);
            let logObj = {};
            console.log(list);
            for (let i = 2; i < list.length - 1; i++) {
                logObj[`property${i-2}`] = list[i];
            }
            for (let p in logObj) {
                this[logObj[p]] = module[logObj[p]];
            }
        }

        if (config.scene)
            this.scene = config.scene;

        if (config.ui)
            this.ui = config.ui;

        if (config.colors)
            this.importHelper(require('./Graphics/colorsHelper').default);

        if (config.maths)
            this.importHelper(require('./Maths/mathsHelper').default);

        if (config.utility)
            this.importHelper(require('./Operations/utilityHelper').default);
    }

    init(config) {
        return new MasterPhaser(config);
    }
}

export default MasterPhaser;