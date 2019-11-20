class UtilityHelper {
    static createBurstFlowAnimation(from, to, amount = 10, atlas = false, key = "coin", duration = 1) {
        let PFHelper = this;

        for (let i = 0; i < amount; i++) {
            let tempCoin;
            if (atlas) {
                tempCoin = this.scene.add.image(0, 0, atlas, key)
                    .setOrigin(0.5, 0.5);
            } else {
                tempCoin = this.scene.add.image(0, 0, key)
                    .setOrigin(0.5, 0.5);
            }
            tempCoin.alpha = 0;
            this.scene.resizeManager.add(tempCoin, function () {
                let o = this;

                this.currentScale = Math.min(PFHelper.scene.lastWidth / this.width, PFHelper.scene.lastHeight / this.height);
                this.currentScale *= 0.05;
                this.setScale(this.currentScale);
                this.resizeX = from.x;
                this.resizeY = from.y;
                this.x = this.resizeX;
                this.y = this.resizeY;

                PFHelper.scene.tweens.killTweensOf(this);
                PFHelper.scene.tweens.add({
                    targets: o,
                    duration: 500,
                    alpha: 1,
                    x: from.x + (Math.random() * 2 - 1) * 200,
                    y: from.y + (Math.random() * 2 - 1) * 200,
                    onComplete: function () {
                        PFHelper.scene.tweens.add({
                            targets: o,
                            x: to.x,
                            y: to.y,
                            duration: 1000 * duration - 500,
                            onComplete: function () {
                                PFHelper.scene.resizeManager.remove(o);
                                o.destroy();
                                o = null;
                            }
                        })
                    }
                })
            });
        }
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