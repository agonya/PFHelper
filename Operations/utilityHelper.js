class UtilityHelper {
    static createBurstFlowAnimation(from, to, amount = 10, atlas = false, key = "coin", duration = 1) {
        let PFHelper = this;

        if (from.goldAnimationPlaying) return;
        from.goldAnimationPlaying = true;

        from.goldAnimationArray = []

        for (let i of this.generateBlankArray(amount)) {
            let tempCoin;
            if (atlas) {
                tempCoin = this.scene.add.image(0, 0, "atlas", key)
                    .setOrigin(0.5, 0.5);
            } else {
                tempCoin = this.scene.add.image(0, 0, key)
                    .setOrigin(0.5, 0.5);
            }
            tempCoin.alpha = 0;
            this.scene.resizeManager.add(tempCoin, function () {
                this.currentScale = Math.min(this.scene.lastWidth / this.width, this.scene.lastHeight / this.height);
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
        for (let o of from.goldAnimationArray) {
            from.goldAnimationTrainArray.push(
                this.TweenTrain.create(this.scene)
                .add(function () {
                    return {
                        targets: o,
                        duration: 500,
                        alpha: 1,
                        x: o.x + from.displayWidth * 1.5 * PFHelper.mapValue(
                            Math.random(),
                            0,
                            1,
                            -1,
                            1
                        ),
                        y: o.y + from.displayHeight * 1.5 * PFHelper.mapValue(
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
        this.TweenTrain.create(this.scene)
            .addParallel(from.goldAnimationTrainArray)
            .addEvent(function () {
                from.goldAnimationPlaying = false;
                for (let o of from.goldAnimationArray) {
                    o.destroy();
                    o = null;
                }
            }).run()
    }

    static pulsate(target, scaleMultiplier = 0.9, duration = 600) {
        if (target.pulseTween) return;
        target.pulseTween = this.scene.tweens.add({
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

    static buttonify(target, callback) {
        UtilityHelper.pulsate(target);
        target.setInteractive();
        target.on("pointerdown", function () {
            this.TweenTrain.create(this.scene)
                .add(function () {
                    return {
                        targets: target,
                        scale: 0.95,
                        duration: 100,
                        yoyo: true
                    }
                }).addEvent(function () {
                    callback(target);
                }).run();
        })
    }
}

export default UtilityHelper;