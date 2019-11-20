/**
 * @classdesc
 * A Tween is able to manipulate the properties of one or more objects to any given value, based
 * on a duration and type of ease. They are rarely instantiated directly and instead should be
 * created via the TweenManager.
 *
 * @class DynamicTween
 * @memberof PFHelper
 * @constructor
 */
class DynamicTween {

    /**
     * 
     * @param {PFHelper.DynamicTweenConfig} conf - Config object to build a Dynamic Tween.
     * @param {Phaser.Scene} scene - Which scene's tween manager is used for building the Dynamic Tween.
     * @param {boolean} [fd = false] - Is this Dynamic Tween full dynamic, which means it refreshes property 'start' and 'end' values every update. Keep 'false' for performance improvement.
     */
    constructor(conf, scene, fd = false) {
        let tw = this;

        //Private Functions
        {
            this['_lerp'] = function (start, end, n) {
                return (1 - n) * start + n * end;
            }

            this['_updateDynamics'] = function (tw, key, counter) {
                if (tw._fullDynamic) tw._refreshKeyOfCounter(counter, key);

                if (counter[key] != -1 && counter['_target'][key] !== undefined) {
                    counter['_target'][key] = counter['_functions'][key]['lerp'](counter['_ranges'][key]['start'], counter['_ranges'][key]['end'],
                        counter[key], counter['_target'], key, counter[key], counter['_index'], tw._targetsLength, tw);
                }
            }

            this['_refreshKeyOfCounter'] = function (counter, key) {
                counter['_ranges'][key]['start'] = counter['_functions'][key]['start'](counter['_target'], key, counter[key], counter['_index'], this._targetsLength, this);
                counter['_ranges'][key]['end'] = counter['_functions'][key]['end'](counter['_target'], key, counter[key], counter['_index'], this._targetsLength, this);
            }

            this['_convertParamFunctions'] = function (func) {
                let result = function (target, key, value, index, totalTargets, tween) {
                    return func(tw.targets[index], key, value, index, totalTargets, tw);
                };
                return result;
            }
        }

        this['_fullDynamic'] = fd;
        this.scene = scene;

        this['_originalConfig'] = {};
        this['_staticConfig'] = {};
        this['_dynamicConfig'] = {};

        this['_dynamicCounters'] = []; //targets for dynamic part
        this['_dynamicRanges'] = [];
        this['_dynamicFunctions'] = [];

        Object.assign(this._originalConfig, conf);
        if (!Array.isArray(conf.targets)) {
            this._originalConfig.targets = [conf.targets];
        } else {
            this._originalConfig.targets = [...conf.targets];
        }
        this['_targetsLength'] = this._originalConfig.targets.length;

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
                            this._dynamicCounters[i][name2] = -1; //Goes up to 1;

                            this._dynamicRanges[i][name2] = {};
                            this._dynamicRanges[i][name2]['start'] = 0;
                            this._dynamicRanges[i][name2]['end'] = 0;

                            this._dynamicFunctions[i][name2] = {};
                            this._dynamicFunctions[i][name2]['start'] = this._convertParamFunctions(conf['dynamics'][name2]['value']['start']);
                            this._dynamicFunctions[i][name2]['end'] = this._convertParamFunctions(conf['dynamics'][name2]['value']['end']);
                            if (conf['dynamics'][name2]['lerp']) {
                                this._dynamicFunctions[i][name2]['lerp'] = conf['dynamics'][name2]['lerp'];
                            } else {
                                this._dynamicFunctions[i][name2]['lerp'] = this._lerp;
                            }
                            this._dynamicCounters[i]['_target'] = this._originalConfig.targets[i];
                            this._dynamicCounters[i]['_ranges'] = this._dynamicRanges[i];
                            this._dynamicCounters[i]['_functions'] = this._dynamicFunctions[i];
                            this._dynamicCounters[i]['_index'] = i;
                        }

                        for (let name3 in conf['dynamics'][name2]) { //name3 is property parameters
                            if (name3 == 'value') {
                                this._dynamicConfig['props'][name2]['value'] = { //Starts from 0 to 1. -1 means hasn't started yet
                                    start: -1,
                                    from: 0,
                                    to: 1,
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

                case 'onActive':
                    this._staticConfig[name] = conf[name];
                    break;

                case 'onComplete':
                    break;

                case 'onLoop':
                    break;

                case 'onUpdate':
                case 'onRepeat':
                    this._staticConfig[name] = () => {
                        tw._originalConfig[name](tw, tw.targets);
                    };
                    this._dynamicConfig[name] = () => {
                        tw._originalConfig[name](tw, tw.targets);
                    };
                    break;

                case 'onYoyo':
                    this._staticConfig[name] = (tween, key, targets) => {
                        tw._originalConfig[name](tw, key, tw.targets);
                    };
                    this._dynamicConfig[name] = (tween, key, targets) => {
                        tw._originalConfig[name](tw, key, tw.targets);
                    };
                    break;

                case 'onStart':
                    this._staticConfig[name] = () => {
                        if (!tw._dynamicPart || !tw._dynamicPart.hasStarted) tw._originalConfig.onStart(tw, tw.targets);
                    };
                    this._dynamicConfig[name] = () => {
                        if (!tw._staticPart || !tw._staticPart.hasStarted) tw._originalConfig.onStart(tw, tw.targets);
                    };
                    break;

                default:
                    this._staticConfig[name] = conf[name] instanceof Function ? this._convertParamFunctions(conf[name]) : conf[name];
                    this._dynamicConfig[name] = conf[name] instanceof Function ? this._convertParamFunctions(conf[name]) : conf[name];
                    break;
            }
        }
        this._dynamicConfig.targets = this._dynamicCounters;

        //Prepare dynamic ranges
        this.refresh();

        //Create Phaser Tweens
        if (this._originalConfig.props != undefined) {
            this['_staticPart'] = this.scene.tweens.add(this._staticConfig);
            //Loop
            this._staticPart.addListener('loop', function (tween, ts) {
                if (!tw._dynamicPart || tw._dynamicPart.waitingForLoop) {
                    if (tw._dynamicPart) {
                        tw._dynamicPart.resume();
                        tw._dynamicPart.waitingForLoop = false;
                    }
                    if (tw._originalConfig.onLoop !== undefined) tw._originalConfig.onLoop(tw, tw.targets);
                } else {
                    tw._staticPart.pause();
                    tw._staticPart.waitingForLoop = true;
                }
            }, this);
            //Complete
            this._staticPart.addListener('complete', () => {
                if (!tw._dynamicPart || tw._dynamicPart.isComplete) tw._originalConfig.onComplete(tw, tw.targets);
                tw._staticPart.isComplete = true;
            }, this);

            this._staticPart.removeAllListeners = () => {};
        }

        if (this._originalConfig.dynamics != undefined) {
            this['_dynamicPart'] = this.scene.tweens.add(this._dynamicConfig);
            //updateDynamics
            this._dynamicPart.addListener('update', (tween, key, targets) => {
                tw._updateDynamics(tw, key, targets) //tw._originalConfig.targets);
            }, this);
            //loop
            this._dynamicPart.addListener('loop', function (tween, ts) {
                if (!tw._staticPart || tw._staticPart.waitingForLoop) {
                    if (tw._staticPart) {
                        tw._staticPart.resume();
                        tw._staticPart.waitingForLoop = false;
                    }
                    if (tw._originalConfig.onLoop !== undefined) tw._originalConfig.onLoop(tw, tw.targets);
                } else {
                    tw._dynamicPart.pause();
                    tw._dynamicPart.waitingForLoop = true;
                }
            }, this);
            //Complete
            this._dynamicPart.addListener('complete', () => {
                if (!tw._staticPart || tw._staticPart.isComplete) tw._originalConfig.onComplete(tw, tw.targets);
                tw._dynamicPart.isComplete = true;
            }, this);

            this._dynamicPart.removeAllListeners = () => {};
        }

        this['_refreshCallbacks'] = [];

        if (DynamicTween['_allDTweens'] === undefined) {
            DynamicTween['_allDTweens'] = [];
        }
        DynamicTween['_allDTweens'].push(this);

    }

    /**
     * Time in ms/frames before the 'onComplete' event fires. This never fires if loop = -1 (as it never completes)
     *
     * @name DynamicTween#completeDelay
     * @type {number}
     * @default 0
     */
    get completeDelay() {
        if (!this._staticPart) return this._dynamicPart.completeDelay;
        if (!this._dynamicPart) return this._staticPart.completeDelay;
        return Math.max(this._staticPart.completeDelay, this._dynamicPart.completeDelay);
    }
    set completeDelay(delay) {
        if (this._staticPart) {
            this._staticPart.completeDelay = delay;
            this._staticPart.calcDuration();
        }
        if (this._dynamicPart) {
            this._dynamicPart.completeDelay = delay;
            this._dynamicPart.calcDuration();
        }
    }

    /**
     * Time in ms/frames for the whole Tween to play through once, excluding loop amounts and loop delays.
     *
     * @name DynamicTween#duration
     * @type {number}
     * @default 0
     */
    get duration() {
        if (!this._staticPart) return this._dynamicPart.duration;
        if (!this._dynamicPart) return this._staticPart.duration;
        return Math.max(this._staticPart.duration, this._dynamicPart.duration);
    }

    /**
     * Elapsed time in ms/frames of this run through the Tween.
     *
     * @name DynamicTween#elapsed
     * @type {number}
     * @default 0
     */
    get elapsed() {
        if (!this._staticPart) return this._dynamicPart.elapsed;
        if (!this._dynamicPart) return this._staticPart.elapsed;
        return Math.max(this._staticPart.elapsed, this._dynamicPart.elapsed);
    }

    /**
     * Is this tween full dynamic.
     * Full dynamic means that the tween refreshes end and start values of the tween every update.
     *
     * @name DynamicTween#fullDynamic
     * @type {bool}
     * @default false
     */
    get fullDynamic() {
        return this._fullDynamic;
    }
    set fullDynamic(fd) {
        this._fullDynamic = fd;
    }

    /**
     * Has this Tween started playback yet?
     *
     * @name DynamicTween#hasStarted
     * @type {boolean}
     * @readonly
     * @since 3.19.0
     */
    get hasStarted() {
        if (!this._staticPart) return this._dynamicPart.hasStarted;
        if (!this._dynamicPart) return this._staticPart.hasStarted;
        return (this._staticPart.hasStarted || this._dynamicPart.hasStarted);
    }

    /**
     * Is this Tween currently seeking?
     *
     * @name DynamicTween#isSeeking
     * @type {boolean}
     * @readonly
     */
    get isSeeking() {
        if (!this._staticPart) return this._dynamicPart.isSeeking;
        if (!this._dynamicPart) return this._staticPart.isSeeking;
        return (this._staticPart.isSeeking || this._dynamicPart.isSeeking);
    }

    /**
     * Loop this tween? Can be -1 for an infinite loop, or an integer.
     *
     * @name DynamicTween#loop
     * @type {number}
     * @default 0
     */
    get loop() {
        if (!this._staticPart) return this._dynamicPart.loop;
        if (!this._dynamicPart) return this._staticPart.loop;
        return Math.max(this._staticPart.loop, this._dynamicPart.loop);
    }

    /**
     * How many loops are left to run?
     *
     * @name DynamicTween#loopCounter
     * @type {number}
     * @default 0
     */
    get loopCounter() {
        if (!this._staticPart) return this._dynamicPart.loopCounter;
        if (!this._dynamicPart) return this._staticPart.loopCounter;
        return Math.max(this._staticPart.loopCounter, this._dynamicPart.loopCounter);
    }

    /**
     * Time in ms/frames before the tween loops.
     *
     * @name DynamicTween#loopDelay
     * @type {number}
     * @default 0
     */
    get loopDelay() {
        if (!this._staticPart) return this._dynamicPart.loopDelay;
        if (!this._dynamicPart) return this._staticPart.loopDelay;
        return Math.max(this._staticPart.loopDelay, this._dynamicPart.loopDelay);
    }
    set loopDelay(delay) {
        if (this._staticPart) {
            this._staticPart.loopDelay = delay;
            this._staticPart.calcDuration();
        }
        if (this._dynamicPart) {
            this._dynamicPart.loopDelay = delay;
            this._dynamicPart.calcDuration();
        }
    }

    /**
     * Does the Tween start off paused? (if so it needs to be started with Tween.play)
     *
     * @name DynamicTween#paused
     * @type {boolean}
     * @default false
     */
    get paused() {
        if (!this._staticPart) return this._dynamicPart.paused;
        if (!this._dynamicPart) return this._staticPart.paused;
        return (this._staticPart.paused && this._dynamicPart.paused);
    }

    /**
     * Value between 0 and 1. The amount through the Tween, excluding loops.
     *
     * @name DynamicTween#progress
     * @type {number}
     * @default 0
     */
    get progress() {
        if (!this._staticPart) return this._dynamicPart.progress;
        if (!this._dynamicPart) return this._staticPart.progress;
        return Math.min(this._staticPart.progress, this._dynamicPart.progress);
    }

    /**
     * Time in ms/frames before the 'onStart' event fires.
     * This is the shortest `delay` value across all of the TweenDatas of this Tween.
     *
     * @name DynamicTween#startDelay
     * @type {number}
     * @default 0
     */
    get startDelay() {
        if (!this._staticPart) return this._dynamicPart.startDelay;
        if (!this._dynamicPart) return this._staticPart.startDelay;
        return Math.min(this._staticPart.startDelay, this._dynamicPart.startDelay);
    }

    /**
     * An array of references to the target/s this Tween is operating on.
     *
     * @name DynamicTween#targets
     * @type {object[]}
     */
    get targets() {
        return this._originalConfig.targets.map((x) => x);
    }

    /**
     * Scales the time applied to this Tween. A value of 1 runs in real-time. A value of 0.5 runs 50% slower, and so on.
     * Value isn't used when calculating total duration of the tween, it's a run-time delta adjustment only.
     *
     * @name DynamicTween#timeScale
     * @type {number}
     * @default 1
     */
    get timeScale() {
        if (!this._staticPart) return this._dynamicPart.timeScale;
        if (!this._dynamicPart) return this._staticPart.timeScale;
        return Math.max(this._staticPart.timeScale, this._dynamicPart.timeScale);
    }
    set timeScale(ts) {
        if (this._staticPart) this._staticPart.timeScale = ts;
        if (this._dynamicPart) this._dynamicPart.timeScale = ts;
    }

    /**
     * Time in ms/frames for the Tween to complete (including looping)
     *
     * @name DynamicTween#totalDuration
     * @type {number}
     * @default 0
     */
    get totalDuration() {
        if (!this._staticPart) return this._dynamicPart.totalDuration;
        if (!this._dynamicPart) return this._staticPart.totalDuration;
        return Math.max(this._staticPart.totalDuration, this._dynamicPart.totalDuration);
    }

    /**
     * Total elapsed time in ms/frames of the entire Tween, including looping.
     *
     * @name DynamicTween#totalElapsed
     * @type {number}
     * @default 0
     */
    get totalElapsed() {
        if (!this._staticPart) return this._dynamicPart.totalElapsed;
        if (!this._dynamicPart) return this._staticPart.totalElapsed;
        return Math.max(this._staticPart.totalElapsed, this._dynamicPart.totalElapsed);
    }

    /**
     * Value between 0 and 1. The amount through the entire Tween, including looping.
     *
     * @name DynamicTween#totalProgress
     * @type {number}
     * @default 0
     */
    get totalProgress() {
        if (!this._staticPart) return this._dynamicPart.totalProgress;
        if (!this._dynamicPart) return this._staticPart.totalProgress;
        return Math.min(this._staticPart.totalProgress, this._dynamicPart.totalProgress);
    }

    /**
     * Add a callback to listener for a given event.
     *
     * @method DynamicTween#addListener
     *
     * @param {(string|symbol)} event - The event name.
     * @param {function} callback - The callback function.
     * @param {*} [scope=this] - The context to invoke the listener with.
     *
     * @return {DynamicTween} `this`.
     */
    addListener(event, callback, scope = this) {
        let tw = this;
        switch (event) {
            case 'refresh':
                this._refreshCallbacks.push(callback.bind(scope));
                break;

            case 'complete':
                this._staticPart.addListener(event, function (tween, targets) {
                    if (tw._dynamicPart.isComplete) callback(tw, tw.targets);
                }, scope);
                this._dynamicPart.addListener(event, function (tween, targets) {
                    if (tw._staticPart.isComplete) callback(tw, tw.targets);
                }, scope);
                break;

            case 'loop':
                this._staticPart.addListener(event, function (tween, targets) {
                    if (!tw._staticPart.waitingForLoop) callback(tw, tw.targets);
                }, scope);
                this._dynamicPart.addListener(event, function (tween, targets) {
                    if (!tw._dynamicPart.waitingForLoop) callback(tw, tw.targets);
                }, scope);
                break;

            case 'start':
                this._staticPart.addListener(event, function (tween, targets) {
                    if (!tw._dynamicPart.hasStarted) callback(tw, tw.targets);
                }, scope);
                this._dynamicPart.addListener(event, function (tween, targets) {
                    if (!tw._staticPart.hasStarted) callback(tw, tw.targets);
                }, scope);
                break;

            default:
                this._staticPart.addListener(event, function (tween, key, targets) {
                    callback(tw, key, tw.targets);
                }, scope);
                this._dynamicPart.addListener(event, function (tween, key, targets) {
                    callback(tw, key, tw.targets);
                }, scope);
                break;
        }
        return this;
    }

    /**
     * Instantly completes the tween, whatever stage of progress it is at.
     *
     * If an onComplete callback has been defined it will automatically invoke it, unless a `delay`
     * argument is provided, in which case the Tween will delay for that period of time before calling the callback.
     *
     * @method DynamicTween#complete
     *
     * @param {number} [delay=0] - The time to wait before invoking the complete callback. If zero it will fire immediately.
     *
     * @return {this} This Tween instance.
     */
    complete(delay = 0) {
        if (this._staticPart) this._staticPart.complete(delay);
        if (this._dynamicPart) this._dynamicPart.complete(delay);
        return this;
    }

    /**
     * Returns the scale of the time applied to this Tween.
     *
     * @method DynamicTween#getTimeScale
     *
     * @return {number} The timescale of this tween.
     */
    getTimeScale() {
        return this.timeScale;
    }

    /**
     * See if this Tween is currently acting upon the given target.
     *
     * @method DynamicTween#hasTarget
     *
     * @param {object} target - The target to check against this Tween.
     *
     * @return {boolean} `true` if the given target is a target of this Tween, otherwise `false`.
     */
    hasTarget(target) {
        return this._originalConfig.targets.includes(target);
    }

    /**
     * Checks if the Tween is currently paused.
     *
     * @method DynamicTween#isPaused
     *
     * @return {boolean} `true` if the Tween is paused, otherwise `false`.
     */
    isPaused() {
        return (this._staticPart && this._staticPart.isPaused()) && (this._dynamicPart && this._dynamicPart.isPaused());
    }

    /**
     * Checks if the Tween is currently active.
     *
     * @method DynamicTween#isPlaying
     *
     * @return {boolean} `true` if the Tween is active, otherwise `false`.
     */
    isPlaying() {
        return (this._staticPart && this._staticPart.isPlaying()) || (this._dynamicPart && this._dynamicPart.isPlaying());
    }

    /**
     * Add a callback to listener for a given event.
     *
     * @method DynamicTween#on
     *
     * @param {(string|symbol)} event - The event name.
     * @param {function} callback - The callback function.
     * @param {*} [scope=this] - The context to invoke the listener with.
     *
     * @return {DynamicTween} `this`.
     */
    on(event, callback, scope = this) {
        this.addListener(event, callback, scope);
        return this;
    }

    /**
     * Pauses the Tween immediately. Use `resume` to continue playback.
     *
     * @method DynamicTween#pause
     *
     * @return {this} - This Tween instance.
     */
    pause() {
        if (this._staticPart) this._staticPart.pause();
        if (this._dynamicPart) this._dynamicPart.pause();
        return this;
    }

    /**
     * Starts a Tween playing.
     * 
     * You only need to call this method if you have configured the tween to be paused on creation.
     * 
     * If the Tween is already playing, calling this method again will have no effect. If you wish to
     * restart the Tween, use `Tween.restart` instead.
     * 
     * Calling this method after the Tween has completed will start the Tween playing again from the start.
     *
     * @method DynamicTween#play
     *
     * @return {this} This Tween instance.
     */
    play() {
        if (this._originalConfig.paused || (this._staticPart.isComplete && this._dynamicPart.isComplete)) {
            this._staticPart.play();
            this._staticPart.isComplete = false;
            this._dynamicPart.play();
            this._dynamicPart.isComplete = false;
            this._originalConfig.paused = false;
        }
        return this;
    }

    /**
     * Refreshes the start and end values of this Dynamic Tween.
     * There is no need to manually call this function if this Dynamic Tween is configured as full dynamic('fullDynamic').
     *
     * @method DynamicTween#pause
     *
     * @return {this} - This Tween instance.
     */
    refresh() {
        for (let i = 0, length = this._originalConfig.targets.length; i < length; i++) {
            for (let prop in this._dynamicFunctions[i]) {
                this._dynamicRanges[i][prop]['start'] = this._dynamicFunctions[i][prop]['start'](this._originalConfig.targets[i], prop, this._dynamicCounters[i], i, this._originalConfig.targets.length, this);
                this._dynamicRanges[i][prop]['end'] = this._dynamicFunctions[i][prop]['end'](this._originalConfig.targets[i], prop, this._dynamicCounters[i], i, this._originalConfig.targets.length, this);
            }
        }
        for (let i = 0; this._refreshCallbacks && i < this._refreshCallbacks.length; i++) {
            this._refreshCallbacks[i](this, this.targets);
        }
        return this;
    }

    /**
     * Immediately removes this Tween from the DynamicTween's list and all of its internal arrays,
     * no matter what stage it as it. Then sets the tween state to `REMOVED`.
     * 
     * You should dispose of your reference to this tween after calling this method, to
     * free it from memory.
     *
     * @method DynamicTween#remove
     *
     * @return {this} This Tween instance.
     */
    remove() {
        DynamicTween.remove(this);
        return this;
    }

    restart() {
        if (this._staticPart) {
            if (this._staticPart.waitingForLoop) {
                this._staticPart.waitingForLoop = false;
                this._staticPart.resume();
            }
            if (this._staticPart.isComplete) {
                this._staticPart.isComplete = false;
            }
            this._staticPart.restart();
        }
        if (this._dynamicPart) {
            if (this._dynamicPart.waitingForLoop) {
                this._dynamicPart.waitingForLoop = false;
                this._dynamicPart.resume();
            }
            if (this._dynamicPart.isComplete) {
                this._dynamicPart.isComplete = false;
            }
            this._dynamicPart.restart();
        }
    }

    /**
     * Restarts the tween from the beginning.
     *
     * @method DynamicTween#restart
     *
     * @return {this} This Tween instance.
     */
    resume() {
        if (this._staticPart && !this._staticPart.waitingForLoop) {
            this._staticPart.resume();
        }
        if (this._dynamicPart && !this._dynamicPart.waitingForLoop) {
            this._dynamicPart.resume();
        }
        return this;
    }

    /**
     * Set the scale the time applied to this Tween. A value of 1 runs in real-time. A value of 0.5 runs 50% slower, and so on.
     *
     * @method DynamicTween#setTimeScale
     *
     * @param {number} ts - The scale factor for timescale.
     *
     * @return {this} - This Tween instance.
     */
    setTimeScale(ts) {
        this.timeScale = ts;
        return this;
    }

    /**
     * Create a Tween and add it to the active Tween list.
     *
     * @static
     * @method DynamicTween#add
     *
     * @param {PFHelper.DynamicTweenConfig} conf - Config object to build a Dynamic Tween.
     * @param {Phaser.Scene} scene - Which scene's tween manager is used for building the Dynamic Tween.
     * @param {boolean} [fd = false] - Is this Dynamic Tween full dynamic, which means it refreshes property 'start' and 'end' values every update. Keep 'false' for performance improvement.
     *
     * @return {DynamicTween} The created DynamicTween.
     */
    static add(conf, scene, fd = false) {
        return new DynamicTween(conf, scene, fd);
    }

    /**
     * Returns an array of all active DynamicTweens in the DynamicTween's list.
     *
     * @static
     * @method DynamicTween#getAllTweens
     *
     * @return {DynamicTween[]} A new array containing references to all active Tweens.
     */
    static getAllDTweens() {
        return DynamicTween._allDTweens.map((x) => x);
    }

    /**
     * Returns an array of all Tweens in the DynamicTween's list which affect the given target.
     *
     * @static
     * @method DynamicTween#getTweensOf
     *
     * @param {object} target - The target to look for.
     *
     * @return {DynamicTween[]} A new array containing all Tweens which affect the given target.
     */
    static getDTweensOf(target) {
        let output = [];
        let all = DynamicTween._allDTweens;

        for (let i = 0; i < all.length; i++) {
            if (all[i]._originalConfig.targets.includes(target)) {
                output.push(all[i]);
            }
        }
        return output;
    }

    /**
     * Checks if the given object is being affected by a playing Tween.
     *
     * @static
     * @method DynamicTween#isTweening
     *
     * @param {object} target - The target to look for.
     *
     * @return {boolean} Returns if target tween object is active or not.
     */
    static isDTweening(target) {
        for (let i = 0; i < DynamicTween._allDTweens.length; i++) {
            if (DynamicTween._allDTweens[i]._originalConfig.targets.includes(target) && DynamicTween._allDTweens[i].isPlaying()) return true;
        }
        return false;
    }

    /**
     * Stops all Tweens in this Tween Manager. They will be removed at the start of the frame.
     *
     * @static
     * @method DynamicTween#killAll
     *
     * @return {DynamicTween} Static DynamicTween class.
     */
    static killAll() {
        for (let i = 0; i < DynamicTween._allDTweens.length; i++) {
            if (DynamicTween._allDTweens[i]._staticPart) DynamicTween._allDTweens[i]._staticPart.stop();
            if (DynamicTween._allDTweens[i]._dynamicPart) DynamicTween._allDTweens[i]._dynamicPart.stop();
        }
        DynamicTween._allDTweens = [];

        return DynamicTween;
    }

    /**
     * Stops all Dynamic Tweens which affect the given target.
     *
     * @see {@link #getDTweensOf}
     *
     * @static
     * @method DynamicTween#killTweensOf
     *
     * @param {object} target - The target to look for.
     *
     * @return {DynamicTween} Static DynamicTween class.
     */
    static killDTweensOf(target) {
        let tws = DynamicTween.getAllDTweens(target);
        for (let i = 0; i < tws.length; i++) {
            if (tws[i]._staticPart) tws[i]._staticPart.stop();
            if (tws[i]._dynamicPart) tws[i]._dynamicPart.stop();
            let idx = DynamicTween._allDTweens.indexOf(tws[i]);
            DynamicTween._allDTweens.splice(idx, 1);
        }

        return DynamicTween;
    }

    /**
     * Refreshes all Dynamic Tweens in DynamicTween's list.
     *
     * @static
     * @method DynamicTween#refreshAll
     *
     * @return {DynamicTween} Static DynamicTween class.
     */
    static refreshAll() {
        for (let i = 0, length = DynamicTween._allDTweens.length; i < length; i++) {
            DynamicTween._allDTweens[i].refresh();
        }

        return DynamicTween;
    }

    /**
     * Pauses all Dynamic Tweens in DynamicTween's list.
     *
     * @static
     * @method DynamicTween#pauseAll
     *
     * @return {DynamicTween}  Static DynamicTween class.
     */
    static pauseAll() {
        for (let i = 0; i < DynamicTween._allDTweens.length; i++) {
            if (DynamicTween._allDTweens[i]._staticPart) DynamicTween._allDTweens[i]._staticPart.pause();
            if (DynamicTween._allDTweens[i]._dynamicPart) DynamicTween._allDTweens[i]._dynamicPart.pause();
        }

        return DynamicTween;
    }

    /**
     * Removes the given Dynamic Tween from DynamicTween's list.
     *
     * @static
     * @method DynamicTween#remove
     *
     * @param {DynamicTween} dTween - The Dynamic Tween to be removed.
     *
     * @return {DynamicTween} Static DynamicTween class.
     */
    static remove(dTween) {
        if (dTween._staticPart) dTween._staticPart.parent.remove(dTween._staticPart);
        if (dTween._dynamicPart) dTween._dynamicPart.parent.remove(dTween._dynamicPart);
        let idx = DynamicTween._allDTweens.indexOf(dTween);
        DynamicTween._allDTweens.splice(idx, 1);

        return DynamicTween;
    }

    /**
     * Resumes all Tweens in this Tween Manager.
     *
     * @static
     * @method DynamicTween#resumeAll
     *
     * @return {DynamicTween} Static DynamicTween class.
     */
    static resumeAll() {
        for (let i = 0; i < DynamicTween._allDTweens.length; i++) {
            let dt = DynamicTween._allDTweens[i];
            if (dt._staticPart && !dt._staticPart.waitingForLoop) dt._staticPart.resume();
            if (dt._dynamicPart && !dt._dynamicPart.waitingForLoop) dt._dynamicPart.resume();
        }

        return DynamicTween;
    }

}

DynamicTween['_allDTweens'] = [];

/**
 * @typedef {object} PFHelper.DynamicTweenConfig
 *
 * @property {any} targets - The object, or an array of objects, to run the tween on.
 * @property {number} [delay=0] - The number of milliseconds to delay before the tween will start.
 * @property {number} [duration=1000] - The duration of the tween in milliseconds.
 * @property {(string|function)} [ease='Power0'] - The easing equation to use for the tween.
 * @property {array} [easeParams] - Optional easing parameters.
 * @property {number} [hold=0] - The number of milliseconds to hold the tween for before yoyo'ing.
 * @property {number} [repeat=0] - The number of times each property tween repeats.
 * @property {number} [repeatDelay=0] - The number of milliseconds to pause before a repeat.
 * @property {boolean} [yoyo=false] - Should the tween complete, then reverse the values incrementally to get back to the starting tween values? The reverse tweening will also take `duration` milliseconds to complete.
 * @property {boolean} [flipX=false] - Horizontally flip the target of the Tween when it completes (before it yoyos, if set to do so). Only works for targets that support the `flipX` property.
 * @property {boolean} [flipY=false] - Vertically flip the target of the Tween when it completes (before it yoyos, if set to do so). Only works for targets that support the `flipY` property.
 * @property {number|function|object|array} [offset=null] - Used when the Tween is part of a Timeline.
 * @property {number|function|object|array} [completeDelay=0] - The time the tween will wait before the onComplete event is dispatched once it has completed, in ms.
 * @property {number|function|object|array} [loop=0] - The number of times the tween will repeat. (A value of 1 means the tween will play twice, as it repeated once.) The first loop starts after every property tween has completed once.
 * @property {number|function|object|array} [loopDelay=0] - The time the tween will pause before starting either a yoyo or returning to the start for a repeat.
 * @property {boolean} [paused=false] - Does the tween start in a paused state (true) or playing (false)?
 * 
 * @property {Object.<string,(number|string|Phaser.Types.Tweens.GetEndCallback|PFHelper.DynamicTweenPropConfig)>} [props] - The properties to tween with classic Phaser tween structure.
 * @property {Object.<string,PFHelper.DynamicTweenDynamicsConfig>} [dynamics] - The properties to tween with Dynamic Tween structure.
 * 
 * @property {boolean} [useFrames=false] - Use frames or milliseconds?
 * @property {any} [callbackScope] - Scope (this) for the callbacks. The default scope is the tween.
 * @property {Phaser.Types.Tweens.TweenOnCompleteCallback} [onComplete] - A function to call when the tween completes.
 * @property {array} [onCompleteParams] - Additional parameters to pass to `onComplete`.
 * @property {any} [onCompleteScope] - Scope (this) for `onComplete`.
 * @property {Phaser.Types.Tweens.TweenOnLoopCallback} [onLoop] - A function to call each time the tween loops.
 * @property {array} [onLoopParams] - Additional parameters to pass to `onLoop`.
 * @property {any} [onLoopScope] - Scope (this) for `onLoop`.
 * @property {Phaser.Types.Tweens.TweenOnRepeatCallback} [onRepeat] - A function to call each time the tween repeats. Called once per property per target.
 * @property {array} [onRepeatParams] - Additional parameters to pass to `onRepeat`.
 * @property {any} [onRepeatScope] - Scope (this) for `onRepeat`.
 * @property {Phaser.Types.Tweens.TweenOnStartCallback} [onStart] - A function to call when the tween starts playback, after any delays have expired.
 * @property {array} [onStartParams] - Additional parameters to pass to `onStart`.
 * @property {any} [onStartScope] - Scope (this) for `onStart`.
 * @property {Phaser.Types.Tweens.TweenOnUpdateCallback} [onUpdate] - A function to call each time the tween steps. Called once per property per target.
 * @property {array} [onUpdateParams] - Additional parameters to pass to `onUpdate`.
 * @property {any} [onUpdateScope] - Scope (this) for `onUpdate`.
 * @property {Phaser.Types.Tweens.TweenOnYoyoCallback} [onYoyo] - A function to call each time the tween yoyos. Called once per property per target.
 * @property {array} [onYoyoParams] - Additional parameters to pass to `onYoyo`.
 * @property {any} [onYoyoScope] - Scope (this) for `onYoyo`.
 * @property {Phaser.Types.Tweens.TweenOnActiveCallback} [onActive] - A function to call when the tween becomes active within the Tween Manager.
 * @property {array} [onActiveParams] - Additional parameters to pass to `onActive`.
 * @property {any} [onActiveScope] - Scope (this) for `onActive`.
 *
 * @example
 * {
 *  targets: rects,
 *      repeat: 0,
 *      yoyo: true,
 *      props: {
 *          y: {
 *              ease: 'Sine',
 *              duration: 1500,
 *              delay: 0,
 *              value: {
 *                  getStart: (t) => {
 *                      return t.originalY + 300;
 *                  },
 *                  getEnd: (t) => {
 *                      return t.originalY - 300;
 *                  },
 *              },
 *          }
 *      },
 *      dynamics: {
 *          x: {
 *              ease: 'Bounce',
 *              duration: 3000,
 *              delay: 0,
 *              value: {
 *                  start: (t) => {
 *                      return -lastWidth / 2 + t.displayWidth / 2;
 *                  },
 *                  end: (t) => {
 *                      return lastWidth / 2 - t.displayWidth / 2;
 *                  },
 *              }
 *          },
 *          fillColor: {
 *              lerp: interpolateColor,
 *              ease: 'Bounce',
 *              duration: 3000,
 *              delay: 0,
 *              value: {
 *                  start: () => {
 *                      return 0x0000ff;
 *                  },
 *                  end: () => {
 *                      return 0xffff00;
 *                  },
 *              }
 *          }
 *      },
 *      //paused: true,
 *      loop: 1,
 *      onStart: () => {
 *          console.log("Started!");
 *      },
 *      onLoop: () => {
 *          console.log("Looped!");
 *      },
 *      onComplete: () => {
 *          console.log("Completed!");
 *      },
 *  };
 */

/**
 * @typedef {object} PFHelper.DynamicTweenPropConfig
 *
 * @property {(number|string|Phaser.Types.Tweens.GetEndCallback|PFHelper.DynamicTweenPropValueConfig)} [value] - How the property will change with the tween. Number and string values determine the END value of propery.
 * @property {(string|function)} [ease] - The ease function this tween uses.
 * @property {number} [delay] - Time in ms/frames before tween will start.
 * @property {number} [duration] - Duration of the tween in ms/frames.
 * @property {boolean} [yoyo] - Determines whether the tween should return back to its start value after hold has expired.
 * @property {number} [hold] - Time in ms/frames the tween will pause before repeating or returning to its starting value if yoyo is set to true.
 * @property {number} [repeat] - Number of times to repeat the tween. The tween will always run once regardless, so a repeat value of '1' will play the tween twice.
 * @property {number} [repeatDelay] - Time in ms/frames before the repeat will start.
 * @property {boolean} [flipX] - Should toggleFlipX be called when yoyo or repeat happens?
 * @property {boolean} [flipY] - Should toggleFlipY be called when yoyo or repeat happens?
 */
/**
 * @typedef {object} PFHelper.DynamicTweenPropValueConfig
 *
 * @property {Phaser.Types.Tweens.GetActiveCallback} [getActive] - What the property will be set to immediately when this tween becomes active.
 * @property {Phaser.Types.Tweens.GetEndCallback} [getEnd] - What the property will be at the END of the Tween.
 * @property {Phaser.Types.Tweens.GetStartCallback} [getStart] - What the property will be at the START of the Tween.
 * @property {(number|string)} [start] - What the property will be at the creation of the Tween.
 * @property {(number|string)} [from] - What the property will be at the START of the Tween.
 * @property {(number|string)} [to] - What the property will be at the END of the Tween.
 */

/**
 * @typedef {object} PFHelper.DynamicTweenDynamicsConfig
 *
 * @property {PFHelper.DynamicTweenDynamicsValueConfig} value - What the property will be at the END of the Tween.
 * @property {PFHelper.DynamicTweenDynamicsLerpFunction} [lerp] - The lerp function this Dynamic Tween uses for this property.
 * @property {(string|function)} [ease] - The ease function this tween uses.
 * @property {number} [delay] - Time in ms/frames before tween will start.
 * @property {number} [duration] - Duration of the tween in ms/frames.
 * @property {boolean} [yoyo] - Determines whether the tween should return back to its start value after hold has expired.
 * @property {number} [hold] - Time in ms/frames the tween will pause before repeating or returning to its starting value if yoyo is set to true.
 * @property {number} [repeat] - Number of times to repeat the tween. The tween will always run once regardless, so a repeat value of '1' will play the tween twice.
 * @property {number} [repeatDelay] - Time in ms/frames before the repeat will start.
 * @property {boolean} [flipX] - Should toggleFlipX be called when yoyo or repeat happens?
 * @property {boolean} [flipY] - Should toggleFlipY be called when yoyo or repeat happens?
 */

/**
 * @typedef {object} PFHelper.DynamicTweenDynamicsValueConfig
 *
 * @property {PFHelper.DynamicTweenDynamicsValueFunction} start - The function to calculate starting value of a property.
 * @property {PFHelper.DynamicTweenDynamicsValueFunction} end - The function to calculate end value of a property.
 */

/**
 * @typedef {function} PFHelper.DynamicTweenDynamicsValueFunction
 *
 * @property {object} [target] - Current target of this value function.
 * @property {string} [key] - Name of the current property being tweened.
 * @property {number} [counter] - Current percentage of value tweening. (Between 0 - 1, -1 for hasn't started tweening)
 * @property {number} [index] - Index of the target of this value function.
 * @property {number} [totalTargets] - Total number of targets being tweened.
 * @property {DynamicTween} [tween] - This DynamicTween object.
 * 
 * @returns {*} - Resultant start or end value.
 */

/**
 * @typedef {function} PFHelper.DynamicTweenDynamicsLerpFunction
 *
 * @property {*} [start] - First boundry value for lerp function.
 * @property {*} [end] - Second boundry value for lerp function.
 * @property {number} [percentage] - Percentage for lerp function.
 * 
 * @property {object} [target] - Current target of this value function.
 * @property {string} [key] - Name of the current property being tweened.
 * @property {number} [counter] - Current percentage of value tweening. (Between 0 - 1, -1 for hasn't started tweening)
 * @property {number} [index] - Index of the target of this value function.
 * @property {number} [totalTargets] - Total number of targets being tweened.
 * @property {DynamicTween} [tween] - This DynamicTween object.
 * 
 * @returns {*} - Calculated lerp value.
 */

export default DynamicTween;