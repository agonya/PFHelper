<a name="DynamicTween"></a>

## DynamicTween
**Kind**: global class  

* [DynamicTween](#DynamicTween)
    * [new DynamicTween(conf, scene, [fd])](#new_DynamicTween_new)
    * [.completeDelay](#DynamicTween+completeDelay) : <code>number</code>
    * [.duration](#DynamicTween+duration) : <code>number</code>
    * [.elapsed](#DynamicTween+elapsed) : <code>number</code>
    * [.fullDynamic](#DynamicTween+fullDynamic) : <code>bool</code>
    * [.hasStarted](#DynamicTween+hasStarted) : <code>boolean</code>
    * [.isSeeking](#DynamicTween+isSeeking) : <code>boolean</code>
    * [.loop](#DynamicTween+loop) : <code>number</code>
    * [.loopCounter](#DynamicTween+loopCounter) : <code>number</code>
    * [.loopDelay](#DynamicTween+loopDelay) : <code>number</code>
    * [.paused](#DynamicTween+paused) : <code>boolean</code>
    * [.progress](#DynamicTween+progress) : <code>number</code>
    * [.startDelay](#DynamicTween+startDelay) : <code>number</code>
    * [.targets](#DynamicTween+targets) : <code>Array.&lt;object&gt;</code>
    * [.timeScale](#DynamicTween+timeScale) : <code>number</code>
    * [.totalDuration](#DynamicTween+totalDuration) : <code>number</code>
    * [.totalElapsed](#DynamicTween+totalElapsed) : <code>number</code>
    * [.totalProgress](#DynamicTween+totalProgress) : <code>number</code>
    * [.addListener(event, callback, [scope])](#DynamicTween+addListener) ÔçÆ [<code>DynamicTween</code>](#DynamicTween)
    * [.complete([delay])](#DynamicTween+complete) ÔçÆ <code>this</code>
    * [.getTimeScale()](#DynamicTween+getTimeScale) ÔçÆ <code>number</code>
    * [.hasTarget(target)](#DynamicTween+hasTarget) ÔçÆ <code>boolean</code>
    * [.isPaused()](#DynamicTween+isPaused) ÔçÆ <code>boolean</code>
    * [.isPlaying()](#DynamicTween+isPlaying) ÔçÆ <code>boolean</code>
    * [.on(event, callback, [scope])](#DynamicTween+on) ÔçÆ [<code>DynamicTween</code>](#DynamicTween)
    * [.pause()](#DynamicTween+pause) ÔçÆ <code>this</code>
    * [.play()](#DynamicTween+play) ÔçÆ <code>this</code>
    * [.pause()](#DynamicTween+pause) ÔçÆ <code>this</code>
    * [.remove()](#DynamicTween+remove) ÔçÆ <code>this</code>
    * [.restart()](#DynamicTween+restart) ÔçÆ <code>this</code>
    * [.setTimeScale(ts)](#DynamicTween+setTimeScale) ÔçÆ <code>this</code>
    * [.add(conf, scene, [fd])](#DynamicTween+add) ÔçÆ [<code>DynamicTween</code>](#DynamicTween)
    * [.getAllTweens()](#DynamicTween+getAllTweens) ÔçÆ [<code>Array.&lt;DynamicTween&gt;</code>](#DynamicTween)
    * [.getTweensOf(target)](#DynamicTween+getTweensOf) ÔçÆ [<code>Array.&lt;DynamicTween&gt;</code>](#DynamicTween)
    * [.isTweening(target)](#DynamicTween+isTweening) ÔçÆ <code>boolean</code>
    * [.killAll()](#DynamicTween+killAll) ÔçÆ [<code>DynamicTween</code>](#DynamicTween)
    * [.killTweensOf(target)](#DynamicTween+killTweensOf) ÔçÆ [<code>DynamicTween</code>](#DynamicTween)
    * [.refreshAll()](#DynamicTween+refreshAll) ÔçÆ [<code>DynamicTween</code>](#DynamicTween)
    * [.pauseAll()](#DynamicTween+pauseAll) ÔçÆ [<code>DynamicTween</code>](#DynamicTween)
    * [.remove(dTween)](#DynamicTween+remove) ÔçÆ [<code>DynamicTween</code>](#DynamicTween)
    * [.resumeAll()](#DynamicTween+resumeAll) ÔçÆ [<code>DynamicTween</code>](#DynamicTween)

<a name="new_DynamicTween_new"></a>

### new DynamicTween(conf, scene, [fd])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| conf | [<code>DynamicTweenConfig</code>](#PFHelper.DynamicTweenConfig) |  | Config object to build a Dynamic Tween. |
| scene | <code>Phaser.Scene</code> |  | Which scene's tween manager is used for building the Dynamic Tween. |
| [fd] | <code>boolean</code> | <code>false</code> | Is this Dynamic Tween full dynamic, which means it refreshes property 'start' and 'end' values every update. Keep 'false' for performance improvement. |

<a name="DynamicTween+completeDelay"></a>

### dynamicTween.completeDelay : <code>number</code>
Time in ms/frames before the 'onComplete' event fires. This never fires if loop = -1 (as it never completes)

**Kind**: instance property of [<code>DynamicTween</code>](#DynamicTween)  
**Default**: <code>0</code>  
<a name="DynamicTween+duration"></a>

### dynamicTween.duration : <code>number</code>
Time in ms/frames for the whole Tween to play through once, excluding loop amounts and loop delays.

**Kind**: instance property of [<code>DynamicTween</code>](#DynamicTween)  
**Default**: <code>0</code>  
<a name="DynamicTween+elapsed"></a>

### dynamicTween.elapsed : <code>number</code>
Elapsed time in ms/frames of this run through the Tween.

**Kind**: instance property of [<code>DynamicTween</code>](#DynamicTween)  
**Default**: <code>0</code>  
<a name="DynamicTween+fullDynamic"></a>

### dynamicTween.fullDynamic : <code>bool</code>
Is this tween full dynamic.
Full dynamic means that the tween refreshes end and start values of the tween every update.

**Kind**: instance property of [<code>DynamicTween</code>](#DynamicTween)  
**Default**: <code>false</code>  
<a name="DynamicTween+hasStarted"></a>

### dynamicTween.hasStarted : <code>boolean</code>
Has this Tween started playback yet?

**Kind**: instance property of [<code>DynamicTween</code>](#DynamicTween)  
**Read only**: true  
**Since**: 3.19.0  
<a name="DynamicTween+isSeeking"></a>

### dynamicTween.isSeeking : <code>boolean</code>
Is this Tween currently seeking?

**Kind**: instance property of [<code>DynamicTween</code>](#DynamicTween)  
**Read only**: true  
<a name="DynamicTween+loop"></a>

### dynamicTween.loop : <code>number</code>
Loop this tween? Can be -1 for an infinite loop, or an integer.

**Kind**: instance property of [<code>DynamicTween</code>](#DynamicTween)  
**Default**: <code>0</code>  
<a name="DynamicTween+loopCounter"></a>

### dynamicTween.loopCounter : <code>number</code>
How many loops are left to run?

**Kind**: instance property of [<code>DynamicTween</code>](#DynamicTween)  
**Default**: <code>0</code>  
<a name="DynamicTween+loopDelay"></a>

### dynamicTween.loopDelay : <code>number</code>
Time in ms/frames before the tween loops.

**Kind**: instance property of [<code>DynamicTween</code>](#DynamicTween)  
**Default**: <code>0</code>  
<a name="DynamicTween+paused"></a>

### dynamicTween.paused : <code>boolean</code>
Does the Tween start off paused? (if so it needs to be started with Tween.play)

**Kind**: instance property of [<code>DynamicTween</code>](#DynamicTween)  
**Default**: <code>false</code>  
<a name="DynamicTween+progress"></a>

### dynamicTween.progress : <code>number</code>
Value between 0 and 1. The amount through the Tween, excluding loops.

**Kind**: instance property of [<code>DynamicTween</code>](#DynamicTween)  
**Default**: <code>0</code>  
<a name="DynamicTween+startDelay"></a>

### dynamicTween.startDelay : <code>number</code>
Time in ms/frames before the 'onStart' event fires.
This is the shortest `delay` value across all of the TweenDatas of this Tween.

**Kind**: instance property of [<code>DynamicTween</code>](#DynamicTween)  
**Default**: <code>0</code>  
<a name="DynamicTween+targets"></a>

### dynamicTween.targets : <code>Array.&lt;object&gt;</code>
An array of references to the target/s this Tween is operating on.

**Kind**: instance property of [<code>DynamicTween</code>](#DynamicTween)  
<a name="DynamicTween+timeScale"></a>

### dynamicTween.timeScale : <code>number</code>
Scales the time applied to this Tween. A value of 1 runs in real-time. A value of 0.5 runs 50% slower, and so on.
Value isn't used when calculating total duration of the tween, it's a run-time delta adjustment only.

**Kind**: instance property of [<code>DynamicTween</code>](#DynamicTween)  
**Default**: <code>1</code>  
<a name="DynamicTween+totalDuration"></a>

### dynamicTween.totalDuration : <code>number</code>
Time in ms/frames for the Tween to complete (including looping)

**Kind**: instance property of [<code>DynamicTween</code>](#DynamicTween)  
**Default**: <code>0</code>  
<a name="DynamicTween+totalElapsed"></a>

### dynamicTween.totalElapsed : <code>number</code>
Total elapsed time in ms/frames of the entire Tween, including looping.

**Kind**: instance property of [<code>DynamicTween</code>](#DynamicTween)  
**Default**: <code>0</code>  
<a name="DynamicTween+totalProgress"></a>

### dynamicTween.totalProgress : <code>number</code>
Value between 0 and 1. The amount through the entire Tween, including looping.

**Kind**: instance property of [<code>DynamicTween</code>](#DynamicTween)  
**Default**: <code>0</code>  
<a name="DynamicTween+addListener"></a>

### dynamicTween.addListener(event, callback, [scope]) ÔçÆ [<code>DynamicTween</code>](#DynamicTween)
Add a callback to listener for a given event.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: [<code>DynamicTween</code>](#DynamicTween) - `this`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| <code>symbol</code> |  | The event name. |
| callback | <code>function</code> |  | The callback function. |
| [scope] | <code>\*</code> | <code>this</code> | The context to invoke the listener with. |

<a name="DynamicTween+complete"></a>

### dynamicTween.complete([delay]) ÔçÆ <code>this</code>
Instantly completes the tween, whatever stage of progress it is at.

If an onComplete callback has been defined it will automatically invoke it, unless a `delay`
argument is provided, in which case the Tween will delay for that period of time before calling the callback.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: <code>this</code> - This Tween instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [delay] | <code>number</code> | <code>0</code> | The time to wait before invoking the complete callback. If zero it will fire immediately. |

<a name="DynamicTween+getTimeScale"></a>

### dynamicTween.getTimeScale() ÔçÆ <code>number</code>
Returns the scale of the time applied to this Tween.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: <code>number</code> - The timescale of this tween.  
<a name="DynamicTween+hasTarget"></a>

### dynamicTween.hasTarget(target) ÔçÆ <code>boolean</code>
See if this Tween is currently acting upon the given target.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: <code>boolean</code> - `true` if the given target is a target of this Tween, otherwise `false`.  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>object</code> | The target to check against this Tween. |

<a name="DynamicTween+isPaused"></a>

### dynamicTween.isPaused() ÔçÆ <code>boolean</code>
Checks if the Tween is currently paused.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: <code>boolean</code> - `true` if the Tween is paused, otherwise `false`.  
<a name="DynamicTween+isPlaying"></a>

### dynamicTween.isPlaying() ÔçÆ <code>boolean</code>
Checks if the Tween is currently active.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: <code>boolean</code> - `true` if the Tween is active, otherwise `false`.  
<a name="DynamicTween+on"></a>

### dynamicTween.on(event, callback, [scope]) ÔçÆ [<code>DynamicTween</code>](#DynamicTween)
Add a callback to listener for a given event.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: [<code>DynamicTween</code>](#DynamicTween) - `this`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>string</code> \| <code>symbol</code> |  | The event name. |
| callback | <code>function</code> |  | The callback function. |
| [scope] | <code>\*</code> | <code>this</code> | The context to invoke the listener with. |

<a name="DynamicTween+pause"></a>

### dynamicTween.pause() ÔçÆ <code>this</code>
Pauses the Tween immediately. Use `resume` to continue playback.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: <code>this</code> - - This Tween instance.  
<a name="DynamicTween+play"></a>

### dynamicTween.play() ÔçÆ <code>this</code>
Starts a Tween playing.

You only need to call this method if you have configured the tween to be paused on creation.

If the Tween is already playing, calling this method again will have no effect. If you wish to
restart the Tween, use `Tween.restart` instead.

Calling this method after the Tween has completed will start the Tween playing again from the start.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: <code>this</code> - This Tween instance.  
<a name="DynamicTween+pause"></a>

### dynamicTween.pause() ÔçÆ <code>this</code>
Refreshes the start and end values of this Dynamic Tween.
There is no need to manually call this function if this Dynamic Tween is configured as full dynamic('fullDynamic').

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: <code>this</code> - - This Tween instance.  
<a name="DynamicTween+remove"></a>

### dynamicTween.remove() ÔçÆ <code>this</code>
Immediately removes this Tween from the DynamicTween's list and all of its internal arrays,
no matter what stage it as it. Then sets the tween state to `REMOVED`.

You should dispose of your reference to this tween after calling this method, to
free it from memory.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: <code>this</code> - This Tween instance.  
<a name="DynamicTween+restart"></a>

### dynamicTween.restart() ÔçÆ <code>this</code>
Restarts the tween from the beginning.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: <code>this</code> - This Tween instance.  
<a name="DynamicTween+setTimeScale"></a>

### dynamicTween.setTimeScale(ts) ÔçÆ <code>this</code>
Set the scale the time applied to this Tween. A value of 1 runs in real-time. A value of 0.5 runs 50% slower, and so on.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: <code>this</code> - - This Tween instance.  

| Param | Type | Description |
| --- | --- | --- |
| ts | <code>number</code> | The scale factor for timescale. |

<a name="DynamicTween+add"></a>

### dynamicTween.add(conf, scene, [fd]) ÔçÆ [<code>DynamicTween</code>](#DynamicTween)
Create a Tween and add it to the active Tween list.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: [<code>DynamicTween</code>](#DynamicTween) - The created DynamicTween.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| conf | [<code>DynamicTweenConfig</code>](#PFHelper.DynamicTweenConfig) |  | Config object to build a Dynamic Tween. |
| scene | <code>Phaser.Scene</code> |  | Which scene's tween manager is used for building the Dynamic Tween. |
| [fd] | <code>boolean</code> | <code>false</code> | Is this Dynamic Tween full dynamic, which means it refreshes property 'start' and 'end' values every update. Keep 'false' for performance improvement. |

<a name="DynamicTween+getAllTweens"></a>

### dynamicTween.getAllTweens() ÔçÆ [<code>Array.&lt;DynamicTween&gt;</code>](#DynamicTween)
Returns an array of all active DynamicTweens in the DynamicTween's list.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: [<code>Array.&lt;DynamicTween&gt;</code>](#DynamicTween) - A new array containing references to all active Tweens.  
<a name="DynamicTween+getTweensOf"></a>

### dynamicTween.getTweensOf(target) ÔçÆ [<code>Array.&lt;DynamicTween&gt;</code>](#DynamicTween)
Returns an array of all Tweens in the DynamicTween's list which affect the given target.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: [<code>Array.&lt;DynamicTween&gt;</code>](#DynamicTween) - A new array containing all Tweens which affect the given target.  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>object</code> | The target to look for. |

<a name="DynamicTween+isTweening"></a>

### dynamicTween.isTweening(target) ÔçÆ <code>boolean</code>
Checks if the given object is being affected by a playing Tween.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: <code>boolean</code> - Returns if target tween object is active or not.  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>object</code> | The target to look for. |

<a name="DynamicTween+killAll"></a>

### dynamicTween.killAll() ÔçÆ [<code>DynamicTween</code>](#DynamicTween)
Stops all Tweens in this Tween Manager. They will be removed at the start of the frame.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: [<code>DynamicTween</code>](#DynamicTween) - Static DynamicTween class.  
<a name="DynamicTween+killTweensOf"></a>

### dynamicTween.killTweensOf(target) ÔçÆ [<code>DynamicTween</code>](#DynamicTween)
Stops all Dynamic Tweens which affect the given target.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: [<code>DynamicTween</code>](#DynamicTween) - Static DynamicTween class.  
**See**: [#getDTweensOf](#getDTweensOf)  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>object</code> | The target to look for. |

<a name="DynamicTween+refreshAll"></a>

### dynamicTween.refreshAll() ÔçÆ [<code>DynamicTween</code>](#DynamicTween)
Refreshes all Dynamic Tweens in DynamicTween's list.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: [<code>DynamicTween</code>](#DynamicTween) - Static DynamicTween class.  
<a name="DynamicTween+pauseAll"></a>

### dynamicTween.pauseAll() ÔçÆ [<code>DynamicTween</code>](#DynamicTween)
Pauses all Dynamic Tweens in DynamicTween's list.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: [<code>DynamicTween</code>](#DynamicTween) - Static DynamicTween class.  
<a name="DynamicTween+remove"></a>

### dynamicTween.remove(dTween) ÔçÆ [<code>DynamicTween</code>](#DynamicTween)
Removes the given Dynamic Tween from DynamicTween's list.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: [<code>DynamicTween</code>](#DynamicTween) - Static DynamicTween class.  

| Param | Type | Description |
| --- | --- | --- |
| dTween | [<code>DynamicTween</code>](#DynamicTween) | The Dynamic Tween to be removed. |

<a name="DynamicTween+resumeAll"></a>

### dynamicTween.resumeAll() ÔçÆ [<code>DynamicTween</code>](#DynamicTween)
Resumes all Tweens in this Tween Manager.

**Kind**: instance method of [<code>DynamicTween</code>](#DynamicTween)  
**Returns**: [<code>DynamicTween</code>](#DynamicTween) - Static DynamicTween class.  
