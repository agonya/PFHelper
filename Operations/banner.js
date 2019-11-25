class BannerHelper {
    constructor() {}

    static addBanner(conf) {
        let def = {
            scene: undefined,
            callback: undefined,
            place: "bottom",

            centeredObject: undefined,
            text: "Banner",

            xRatio: 0.5,
            yRatio: 0.5,
            wRatio: 0.8,
            hRatio: 0.8,

            coverage: 0.1,
            maxHeight: 10000,

            texture: undefined,
            frame: undefined,
            backColor: 0x000000,
            backAlpha: 1,

            textConfig: {
                color: "#ffffff",
                align: 'center',
                fontSize: 64,
                fontFamily: 'ui-font',

                strokeThickness: 0,
                stroke: "#ffffff",

                shadow: {
                    offsetX: 0,
                    offsetY: 8,
                    color: "#333333",
                    blur: 2,
                    stroke: false,
                    fill: false,
                }
            }

        }

        let c = Object.assign({}, def, conf);

        if (conf.textConfig) {
            c.textConfig = Object.assign({}, def.textConfig, conf.textConfig);

            if (conf.textConfig.shadow) {
                c.textConfig.shadow = Object.assign({}, def.textConfig.shadow, conf.textConfig.shadow);
            } else {
                c.textConfig.shadow = {};
            };
        }

        let banner = {};
        let bg;

        if (c.texture === undefined || c.texture === null) {
            bg = c.scene.add.rectangle(0, 0, 100, 100, c.backColor, 1).setAlpha(c.backAlpha);
        } else {
            bg = c.scene.add.image(0, 0, c.texture, c.frame).setAlpha(c.backAlpha);
        }

        if (c.centeredObject === undefined || c.centeredObject === null) {
            c.centeredObject = c.scene.add.text(0, 0, c.text, c.textConfig).setOrigin(0.5);
        }

        let ignore = ["text", "texture", "frame", "textConfig"];
        for (let prop in c) {
            if (ignore.includes(prop) || c[prop] === undefined || c[prop] === null) continue;
            banner[prop] = c[prop];
        }
        bg.banner = banner;
        banner.background = bg;

        banner.hide = function (dur = 0) {
            if (dur == 0) {
                banner.background.alpha = 0;
                banner.centeredObject.alpha = 0;
                return;
            }
            banner.scene.tweens.add({
                targets: [banner.background, banner.centeredObject],
                alpha: 0,
                duration: dur,
            });
        }

        banner.show = function (dur = 0) {
            if (dur == 0) {
                banner.background.alpha = banner.backAlpha;
                banner.centeredObject.alpha = 1;
                return;
            }
            banner.scene.tweens.add({
                targets: banner.centeredObject,
                alpha: 1,
                duration: dur,
            });
            banner.scene.tweens.add({
                targets: banner.background,
                alpha: banner.backAlpha,
                duration: dur,
            });
        }

        banner.background.onResizeCallback = function (w, h) {
            let cam = banner.scene.cameras.main;
            let bg = banner.background;
            let centered = banner.centeredObject;

            if (banner.place == "top") {
                bg.setOrigin(0.5, 0).setPosition(cam.midPoint.x, cam.midPoint.y - cam.displayHeight / 2);
            } else {
                bg.setOrigin(0.5, 1).setPosition(cam.midPoint.x, cam.midPoint.y + cam.displayHeight / 2);
            }
            bg.setScale(cam.displayWidth / bg.width,
                Math.min(cam.displayHeight * banner.coverage, banner.maxHeight) / bg.height);

            let bounds = centered.setScale(1).setDepth(bg.depth + 1).getBounds();
            if (centered.setOrigin != undefined) centered.setOrigin(0.5);
            centered.setPosition(bg.getCenter().x - (0.5 - banner.xRatio) * bg.displayWidth, bg.getCenter().y - (0.5 - banner.yRatio) * bg.displayHeight);
            centered.setScale(Math.min(bg.displayWidth * banner.wRatio / Math.max(centered.width, bounds.width),
                bg.displayHeight * banner.hRatio / Math.max(centered.height, bounds.height)));
        }

        banner.background.onResizeCallback(banner.scene.lastWidth, banner.scene.lastHeight);

        if (banner.callback) {
            banner.background.setInteractive().on("pointerdown", banner.callback);
        }

        return banner;
    }
}

export default BannerHelper;