class OperationsHelper {

    static createBurstFlowAnimation(from, to, amount = 10, key = "coin", duration = 1) {
        if (from.goldAnimationPlaying) return;
        from.goldAnimationPlaying = true;

        from.goldAnimationArray = []

        for (let i of MathsHelper.generateBlankArray(amount)) {
            let tempCoin = scene.add.image(0, 0, key)
                .setOrigin(0.5, 0.5);
            tempCoin.alpha = 0;
            scene.resizeManager.add(tempCoin, function () {
                this.currentScale = Math.min(currentWidth / this.width, currentHeight / this.height);
                this.resizeX = from.x;
                this.resizeY = from.y;
                this.currentScale *= 0.05;
                this.setScale(this.currentScale);
                this.x = this.resizeX;
                this.y = this.resizeY;
            });
            from.goldAnimationArray.push(tempCoin);
        }

        from.goldAnimationTrainArray = [];
        for (let o of game.goldAnimationArray) {
            from.goldAnimationTrainArray.push(
                TweenTrain.create(scene)
                .add(function () {
                    return {
                        targets: o,
                        duration: 500,
                        alpha: 1,
                        x: o.x + from.displayWidth * 1.5 * MathsHelper.mapValue(
                            Math.random(),
                            0,
                            1,
                            -1,
                            1
                        ),
                        y: o.y + from.displayHeight * 1.5 * MathsHelper.mapValue(
                            Math.random(),
                            0,
                            1,
                            -1,
                            1
                        )
                    }
                })
                .add(function () {
                    return {
                        targets: o,
                        x: to.x,
                        y: to.y,
                        duration: duration * 1000
                    }
                })
            )
        }
        TweenTrain.create(scene)
            .addParallel(from.goldAnimationTrainArray)
            .addEvent(function () {
                from.goldAnimationPlaying = false;
                for (let o of from.goldAnimationArray) {
                    o.destroy();
                    o = null;
                }
            }).run()
    }

    static getSubSegment(type, obj) {
        let tempArr = [];
        for (const [key, value] of Object.entries(obj)) {
            if (key.substr(0, type.length) == type) {
                tempArr = [...tempArr, value];
            }
        }
        return tempArr;
    }

    static removeSubSegment(type, obj) {
        for (let t of OperationsHelper.getSubSegment(type, obj)) {
            obj.resizeManager.remove(t);
            t.destroy();
            for (const [key, value] of Object.entries(obj)) {
                if (value == t) {
                    delete obj[key];
                    break;
                }
            }
        }
    }

    static pulsate(target, scaleMultiplier = 0.9, duration = 600) {
        if (target.pulseTween) return;
        target.pulseTween = scene.tweens.add({
            targets: target,
            scale: target.currentScale * scaleMultiplier,
            duration: duration,
            yoyo: true,
            repeat: -1
        });
    }

    static unpulsate(target) {
        if (!target.pulseTween) return;
        target.pulseTween.stop();
        target.pulseTween = false;
        target.setScale(target.currentScale);
    }

    /**
     * @description Lists the properties of the helper to the console
     *
     * @static
     * @memberof OperationsHelper
     * 
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     */
    static help() {
        let list = Object.getOwnPropertyNames(OperationsHelper);
        let logObj = {};
        for (let i = 3; i < list.length - 1; i++) {
            logObj[`property${i-2}`] = list[i];
        }
        for (let p in logObj) {
            console.log(
                `${p}: ${logObj[p]}`
            )
        }
    }
}

export default OperationsHelper;