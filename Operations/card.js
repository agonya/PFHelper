class CardHelper {
    constructor() {}

    static addCard(conf) {
        let def = {
            scene: undefined,
            callback: undefined,

            xRatio: 0.5,
            yRatio: 0.5,
            wRatio: 1,
            hRatio: 1,

            texture: undefined,
            frame: undefined,
            backColor: 0x000000,
            backAlpha: 0.8,

            hidden: false,
            blocking: true,

            objects: [],
        }

        let c = Object.assign({}, def, conf);
        if (Array.isArray(conf.objects)) {
            c.objects = [...conf.objects];
        } else if (!(conf.objects === undefined || conf.objects === null)) {
            c.objects = [conf.objects];
        } else {
            c.objects = undefined;
        }

        let defaultAlphas = [];
        let card = {};

        let bg;
        if (c.texture === undefined || c.texture === null) {
            bg = c.scene.add.rectangle(0, 0, 100, 100, c.backColor, 1).setAlpha(c.backAlpha);
        } else {
            bg = c.scene.add.image(0, 0, c.texture, c.frame).setAlpha(c.backAlpha);
        }

        for (let i = 0; Array.isArray(c.objects) && i < c.objects.length; i++) {
            let obj = c.objects[i];
            if (!(obj === undefined || obj === null) && obj.alpha !== undefined) {
                defaultAlphas.push({
                    object: obj,
                    alpha: obj.alpha,
                });
            }
        }

        let ignore = ["texture", "frame", "hidden", "blocking"];
        for (let prop in c) {
            if (ignore.includes(prop) || c[prop] === undefined || c[prop] === null) continue;
            card[prop] = c[prop];
        }

        card.background = bg;
        bg.card = card;

        card.show = function (dur = 0) {
            if (dur == 0) {
                card.background.alpha = c.backAlpha;
                for (let i = 0; Array.isArray(card.objects) && i < card.objects.length; i++) {
                    let obj = card.objects[i];
                    if (!(obj === undefined || obj === null) && obj.alpha !== undefined) {
                        obj.alpha = defaultAlphas.filter((v) => {
                            return v.object === obj;
                        })[0].alpha;
                    };
                }
                return;
            }

            card.scene.tweens.add({
                targets: card.background,
                alpha: c.backAlpha,
                duration: dur,
            });
            for (let i = 0; Array.isArray(card.objects) && i < card.objects.length; i++) {
                let obj = card.objects[i];
                if (!(obj === undefined || obj === null) && obj.alpha !== undefined) {
                    let a = defaultAlphas.filter((v) => {
                        return v.object === obj;
                    })[0].alpha;

                    card.scene.tweens.add({
                        targets: obj,
                        alpha: a,
                        duration: dur,
                    });
                }
            }
        }

        card.hide = function (dur = 0) {
            if (dur == 0) {
                card.background.alpha = 0;
                for (let i = 0; Array.isArray(card.objects) && i < card.objects.length; i++) {
                    let obj = card.objects[i];
                    if (!(obj === undefined || obj === null) && obj.alpha !== undefined) {
                        defaultAlphas.filter((v) => {
                            return v.object === obj;
                        })[0].alpha = obj.alpha;

                        obj.alpha = 0;
                    };
                }
                return;
            }

            card.scene.tweens.add({
                targets: card.background,
                alpha: 0,
                duration: dur,
            });
            for (let i = 0; Array.isArray(card.objects) && i < card.objects.length; i++) {
                let obj = card.objects[i];
                if (!(obj === undefined || obj === null) && obj.alpha !== undefined) {
                    defaultAlphas.filter((v) => {
                        return v.object === obj;
                    })[0].alpha = obj.alpha;

                    card.scene.tweens.add({
                        targets: obj,
                        alpha: 0,
                        duration: dur,
                    });
                }
            }
        }

        card.background.onResizeCallback = function (w, h) {
            let cam = card.scene.cameras.main;
            let bg = card.background;

            card.background.x = cam.midPoint.x - (0.5 - c.xRatio) * cam.displayWidth;
            card.background.y = cam.midPoint.y - (0.5 - c.yRatio) * cam.displayHeight;

            bg.setScale(cam.displayWidth * c.wRatio / bg.width, cam.displayHeight * c.hRatio / bg.height);

            for (let i = 0; Array.isArray(card.objects) && i < card.objects.length; i++) {
                let obj = card.objects[i];
                if (obj !== undefined && obj !== null && obj.depth !== undefined && obj.depth !== null) {
                    obj.setDepth(bg.depth + 1);
                }
                if (obj !== undefined && obj !== null && obj.onResizeCallback !== undefined && obj.onResizeCallback !== null) {
                    obj.onResizeCallback(w, h);
                }
            }
        }

        card.setDepth = function (d) {
            card.background.setDepth(d);
            card.background.onResizeCallback(card.scene.lastWidth, card.scene.lastHeight);
            return card;
        }

        if (c.hidden) card.hide(0);
        if (c.blocking) card.background.setInteractive();
        if (c.callback) card.background.on("pointerdown", c.callback);

        card.background.onResizeCallback(card.scene.lastWidth, card.scene.lastHeight);

        return card;
    }
}

export default CardHelper;