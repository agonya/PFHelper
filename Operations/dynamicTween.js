class DynamicTween {
    constructor(conf, sc, fd = false) {
        this.fullDynamic = fd;
        this._scene = sc;

        this._originalConfig = {};
        this._staticConfig = {};
        this._dynamicConfig = {};

        this._dynamicCounters = []; //targets for dynamic part
        this._dynamicRanges = [];
        this._dynamicFunctions = [];

        Object.assign(this._originalConfig, conf);
        if (!Array.isArray(conf.targets)) this._originalConfig.targets = [conf.targets];

        //Prime the dynamic containers
        for (let i = 0; i < this._originalConfig.targets.length; i++) {
            this._dynamicCounters[i] = {};
            this._dynamicRanges[i] = {};
            this._dynamicFunctions[i] = {};
        }

        //Config deconstruction
        for (let name in conf) {
            switch (name) {
                case 'targets':
                    this._staticConfig[name] = conf[name];
                    break;

                case 'dynamics':
                    this._dynamicConfig['props'] = {};

                    for (let name2 in conf['dynamics']) { //name2 is property name
                        this._dynamicConfig['props'][name2] = {};

                        //Prime the dynamic container' properties
                        for (let i = 0; i < this._originalConfig.targets.length; i++) {
                            this._dynamicCounters[i][name2] = -1; //Goes up to 100;

                            this._dynamicRanges[i][name2] = {};
                            this._dynamicRanges[i][name2]['start'] = 0;
                            this._dynamicRanges[i][name2]['end'] = 0;

                            this._dynamicFunctions[i][name2] = {};
                            this._dynamicFunctions[i][name2]['start'] = this._convertParamFunctions(conf['dynamics'][name2]['value']['start']);
                            this._dynamicFunctions[i][name2]['end'] = this._convertParamFunctions(conf['dynamics'][name2]['value']['end']);
                        }

                        for (let name3 in conf['dynamics'][name2]) { //name3 is property parameters
                            if (name3 == 'value') {
                                this._dynamicConfig['props'][name2]['value'] = { //Starts from 0 to 100. -1 means hasn't started yet
                                    start: -1,
                                    from: 0,
                                    to: 100
                                };
                            } else {
                                this._dynamicConfig['props'][name2][name3] = conf['dynamics'][name2][name3] instanceof Function ?
                                    this._convertParamFunctions(conf['dynamics'][name2][name3]) : conf['dynamics'][name2][name3];
                            }
                        }
                    }
                    break;

                case 'props':
                    this._staticConfig[name] = conf[name];
                    break;

                case 'onComplete':
                    let tw = this;
                    this._staticConfig[name] = () => {
                        if (tw._dynamicPart.isComplete) tw._originalConfig.onComplete(tw, tw._originalConfig.targets);
                        tw._staticPart.isComplete = true;
                    };
                    this._dynamicConfig[name] = () => {
                        if (tw._staticPart.isComplete) tw._originalConfig.onComplete(tw, tw._originalConfig.targets);
                        tw._dynamicPart.isComplete = true;
                    };
                    break;

                default:
                    this._staticConfig[name] = conf[name] instanceof Function ? this._convertParamFunctions(conf[name]) : conf[name];
                    this._dynamicConfig[name] = conf[name] instanceof Function ? this._convertParamFunctions(conf[name]) : conf[name];
                    break;
            }
        }

        this._dynamicConfig.targets = this._dynamicCounters;
        this._dynamicConfig.onUpdate = this._updateDynamics.bind(this);
        this.refresh();

        if (this._originalConfig.props != undefined) this._staticPart = this._scene.tweens.add(this._staticConfig);
        if (this._originalConfig.dynamics != undefined) this._dynamicPart = this._scene.tweens.add(this._dynamicConfig);
    }

    _lerp(start, end, high, low, value) {
        let n = (high - value) / (high - low);
        return (1 - n) * start + n * end;
    }

    _updateDynamics(tween, key) {
        if (this.fullDynamic) this.refresh();

        for (let i = 0; i < this._dynamicCounters.length; i++) {
            for (let prop in this._dynamicCounters[i]) {
                if (this._dynamicCounters[i][prop] != -1)
                    this._originalConfig.targets[i][prop] = this._lerp(this._dynamicRanges[i][prop]['start'], this._dynamicRanges[i][prop]['end'], 0, 100, this._dynamicCounters[i][prop]);
            }
        }

    }

    _convertParamFunctions(func) {
        let tw = this;
        let result = function (target, key, value, index, totalTargets, tween) {
            return func(tw._originalConfig.targets[index], key, value, index, totalTargets, tw);
        };
        return result;
    }

    refresh() {
        for (let i = 0; i < this._originalConfig.targets.length; i++) {
            for (let prop in this._dynamicFunctions[i]) {
                this._dynamicRanges[i][prop]['start'] = this._dynamicFunctions[i][prop]['start'](this._originalConfig.targets[i], prop, this._dynamicCounters[i] / 100, i, this._originalConfig.targets.length, this);
                this._dynamicRanges[i][prop]['end'] = this._dynamicFunctions[i][prop]['end'](this._originalConfig.targets[i], prop, this._dynamicCounters[i] / 100, i, this._originalConfig.targets.length, this);
            }
        }
    }

}

export default DynamicTween;