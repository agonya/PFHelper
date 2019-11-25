class ButtonHelper {

    constructor() {}

    /**
     * @description Creates and displays a button with a texture as a background then returns it as a Phaser Container.
     *
     * @function addTexturedButton
     * @static
     * @param {object} conf - Config Object.
     * @param {Phaser.Scene} conf.scene - Scene to create the button in.
     * @param {string} [conf.texture=atlas] - Key for the displayed texture.
     * @param {string} [conf.frame] - Frame key for the displayed texture.
     * @param {string} [conf.text] - Text to put on the button.
     * @param {function} [conf.callback = undefined] - Callback function of button.
     * 
     * @param {number} [conf.xRatio = 0.5] - Displacement ratio of text on button on X axis.
     * @param {number} [conf.yRatio = 0.5] - Displacement ratio of text on button on Y axis.
     * @param {number} [conf.wRatio = 0.5] - Width scaling ratio of text compared to button.
     * @param {number} [conf.hRatio = 0.5] - Height scaling ratio of text compared to button.
     * 
     * @param {object} [conf.textConfig] - Config Object for button text.
     * @param {string} [conf.textConfig.color = '#ffffff'] - Color of button text.
     * @param {string} [conf.textConfig.align = center] - Alignment of button text.
     * @param {number} [conf.textConfig.fontSize = 64] - Font size of button text.
     * @param {string} [conf.textConfig.fontFamily = ui-font] - Font family of button text.
     * 
     * @param {string} [conf.textConfig.stroke = '#000000'] - Stroke color of button text.
     * @param {number} [conf.textConfig.strokeThickness = 0] - Stroke amount of button text.
     * 
     * @param {object} [conf.textConfig.shadow] - Config object for button text shadow. Pass 'false' to disable completely. 
     * @param {number} [conf.textConfig.shadow.offsetX = 2] - Displacement on X axis for button text shadow.
     * @param {number} [conf.textConfig.shadow.offsetY = 8] - Displacement on Y axis for button text shadow.
     * @param {string} [conf.textConfig.shadow.color = '#333333'] - Button text shadow color.
     * @param {number} [conf.textConfig.shadow.blur = 2] - The amount of blur applied to the button text shadow. Leave as zero for a hard shadow.
     * @param {boolean} [conf.textConfig.shadow.stroke = true] - Apply the shadow to the stroke effect on the button text?
     * @param {boolean} [conf.textConfig.shadow.fill = true] - Apply the shadow to the fill effect on the button text?
     * 
     * @returns {Phaser.Container} - Phaser Container
     * @memberof ButtonHelper
     * 
     * @author Kadir Mert Okumuş <kadirmertokumus@gmail.com>
     */
    static addTexturedButton(conf) {

        let def = {
            scene: undefined,
            texture: "atlas",
            frame: "",
            text: "Button",
            callback: undefined,

            xRatio: 0.5,
            yRatio: 0.5,
            wRatio: 0.8,
            hRatio: 0.8,

            textConfig: {
                color: "#ffffff",
                align: 'center',
                fontSize: 64,
                fontFamily: 'ui-font',

                strokeThickness: 0,
                stroke: "#000000",

                shadow: {
                    offsetX: 2,
                    offsetY: 8,
                    color: "#333333",
                    blur: 2,
                    stroke: true,
                    fill: true,
                }
            }
        }

        let c = Object.assign({}, def, conf);
        if (conf.textConfig) {
            c.textConfig = Object.assign({}, def.textConfig, conf.textConfig);

            if (conf.textConfig.shadow) {
                c.textConfig.shadow = Object.assign({}, def.textConfig.shadow, conf.textConfig.shadow)
            } else {
                c.textConfig.shadow = {};
            };
        }

        let btn = c.scene.add.container();
        let bg = c.scene.add.image(0, 0, c.texture, c.frame)
        let txt = c.scene.add.text(0, 0, c.text, c.textConfig).setOrigin(0.5);

        txt.setScale(Math.min(bg.width * c.wRatio / txt.width, bg.height * c.hRatio / txt.height));
        txt.setPosition(bg.width * (c.xRatio - 0.5), bg.height * (c.yRatio - 0.5));

        btn.add(bg);
        btn.add(txt);

        btn.background = bg;
        btn.text = txt;

        btn.width = bg.width;
        btn.height = bg.height;

        if (!(c.callback === null || c.callback === undefined)) bg.setInteractive().on("pointerdown", c.callback);
        return btn;
    }

    /**
     * @description Creates and displays a button with a flat color as a background then returns it as a Phaser Container.
     *
     * @static
     * @param {object} conf - Config Object.
     * @param {Phaser.Scene} conf.scene - Scene to create the button in.
     * @param {string} [conf.text] - Text to put on the button.
     * @param {function} [conf.callback = undefined] - Callback function of button.
     * 
     * @param {number} [conf.xRatio = 0.5] - Displacement ratio of text on button on X axis.
     * @param {number} [conf.yRatio = 0.5] - Displacement ratio of text on button on Y axis.
     * @param {number} [conf.wRatio = 0.5] - Width scaling ratio of text compared to button.
     * @param {number} [conf.hRatio = 0.5] - Height scaling ratio of text compared to button.
     * 
     * @param {object} [conf.backgroundConfig] - Config Object for button background.
     * @param {number} [conf.backgroundConfig.color = 0x990000] - Button background color.
     * @param {number} [conf.backgroundConfig.width = 400] - Button background width.
     * @param {number} [conf.backgroundConfig.height = 80] - Button background height.
     * @param {number} [conf.backgroundConfig.alpha = 1] - Button background alpha.
     * @param {number} [conf.backgroundConfig.roundCorners = 0] - How many pixels, the background corners are rounded.
     * 
     * @param {number} [conf.backgroundConfig.strokeThickness = 0] - Stroke amount of button background.
     * @param {number} [conf.backgroundConfig.stroke = 0x000000] - Stroke color of button background.
     * @param {number} [conf.backgroundConfig.strokeAlpha = 1] - Button background stroke alpha.
     * 
     * @param {object} [conf.backgroundConfig.shadow] - Config object for button background shadow.
     * @param {number} [conf.backgroundConfig.shadow.offsetX = 1] - Displacement on X axis for button background shadow.
     * @param {number} [conf.backgroundConfig.shadow.offsetY = 5] - Displacement on Y axis for button background shadow.
     * @param {number} [conf.backgroundConfig.shadow.color = 0x000000] - Button background shadow color.
     * @param {number} [conf.backgroundConfig.shadow.alpha = 0.5] - Button background shadow alpha.
     * 
     * @param {object} [conf.textConfig] - Config Object for button text.
     * @param {string} [conf.textConfig.color = '#ffffff'] - Color of button text.
     * @param {string} [conf.textConfig.align = center] - Alignment of button text.
     * @param {number} [conf.textConfig.fontSize = 64] - Font size of button text.
     * @param {string} [conf.textConfig.fontFamily = ui-font] - Font family of button text.
     * 
     * @param {string} [conf.textConfig.stroke = '#000000'] - Stroke color of button text.
     * @param {number} [conf.textConfig.strokeThickness = 0] - Stroke amount of button text.
     * 
     * @param {object} [conf.textConfig.shadow] - Config object for button text shadow. Pass 'false' to disable completely. 
     * @param {number} [conf.textConfig.shadow.offsetX = 2] - Displacement on X axis for button text shadow.
     * @param {number} [conf.textConfig.shadow.offsetY = 8] - Displacement on Y axis for button text shadow.
     * @param {string} [conf.textConfig.shadow.color = '#333333'] - Button text shadow color.
     * @param {number} [conf.textConfig.shadow.blur = 2] - The amount of blur applied to the button text shadow. Leave as zero for a hard shadow.
     * @param {boolean} [conf.textConfig.shadow.stroke = true] - Apply the shadow to the stroke effect on the button text?
     * @param {boolean} [conf.textConfig.shadow.fill = true] - Apply the shadow to the fill effect on the button text?
     * 
     * @returns {Phaser.Container} - Phaser Container
     * @memberof ButtonHelper
     * 
     * @author Kadir Mert Okumuş <kadirmertokumus@gmail.com>
     */
    static addGraphicsButton(conf) {
        let def = {
            scene: undefined,
            text: "Button",
            callback: undefined,

            xRatio: 0.5,
            yRatio: 0.45,
            wRatio: 0.8,
            hRatio: 0.8,

            backgroundConfig: {
                color: 0x990000,
                width: 400,
                height: 80,
                alpha: 1,
                roundCorners: 0,

                strokeThickness: 0,
                stroke: 0x000000,
                strokeAlpha: 1,

                shadow: {
                    offsetX: 1,
                    offsetY: 5,
                    color: 0x000000,
                    alpha: 0.5,
                }
            },

            textConfig: {
                color: "#ffffff",
                align: 'center',
                fontSize: 64,
                fontFamily: 'ui-font',

                strokeThickness: 0,
                stroke: "#000000",

                shadow: {
                    offsetX: 0,
                    offsetY: 8,
                    color: "#333333",
                    blur: 2,
                    stroke: true,
                    fill: true,
                }
            }
        }

        let fillRect = function (bg, w, h, roundCorners, color, opacity, stroke, strokeColor, strokeOpacity, dx = 0, dy = 0) {

            bg.fillStyle(color, opacity);
            bg.lineStyle(stroke, strokeColor, strokeOpacity);

            let x = -w * 0.5 + dx;
            let y = -h * 0.5 + dy;

            if (roundCorners == 0) {
                bg.fillRect(x, y, w, h);

                if (stroke) {
                    bg.strokeRect(x, y, w, h);
                }
            } else {
                if (!stroke) {
                    bg.fillRoundedRect(x, y, w, h, roundCorners, roundCorners);
                } else if (app.main.hasWebGL) {
                    bg.fillRoundedRect(x, y, w, h, roundCorners, roundCorners);
                    w += stroke * 0.5;
                    h += stroke * 0.5;
                    bg.strokeRoundedRect(x, y, w, h, roundCorners, roundCorners);

                } else {
                    let w2 = w + stroke;
                    let h2 = h + stroke;
                    bg.fillStyle(strokeColor, strokeOpacity);
                    bg.fillRoundedRect(-w2 * 0.5, -h2 * 0.5, w2, h2, roundCorners, roundCorners);
                    bg.fillStyle(color, opacity);
                    bg.fillRoundedRect(-w * 0.5, -h * 0.5, w, h, roundCorners, roundCorners);
                }
            }
        }

        let c = Object.assign({}, def, conf);

        if (conf.textConfig) {
            c.textConfig = Object.assign({}, def.textConfig, conf.textConfig);

            if (conf.textConfig.shadow) {
                c.textConfig.shadow = Object.assign({}, def.textConfig.shadow, conf.textConfig.shadow)
            } else {
                c.textConfig.shadow = {};
            };
        }

        if (conf.backgroundConfig) {
            c.backgroundConfig = Object.assign({}, def.backgroundConfig, conf.backgroundConfig);

            if (c.backgroundConfig.shadow) {
                c.backgroundConfig.shadow = Object.assign({}, def.backgroundConfig.shadow, conf.backgroundConfig.shadow);
            } else {
                c.backgroundConfig.shadow = false;
            }
        }

        let btn = c.scene.add.container();
        let bg = c.scene.add.graphics();

        bg.width = c.backgroundConfig.width;
        bg.height = c.backgroundConfig.height;

        if (c.backgroundConfig.shadow) {
            fillRect(bg, c.backgroundConfig.width + c.backgroundConfig.strokeThickness * 2, c.backgroundConfig.height + c.backgroundConfig.strokeThickness * 2, c.backgroundConfig.roundCorners,
                c.backgroundConfig.shadow.color, c.backgroundConfig.shadow.alpha, null, 0, 0, c.backgroundConfig.shadow.offsetX, c.backgroundConfig.shadow.offsetY);
        }

        fillRect(bg, c.backgroundConfig.width, c.backgroundConfig.height, c.backgroundConfig.roundCorners, c.backgroundConfig.color, c.backgroundConfig.alpha, c.backgroundConfig.strokeThickness,
            c.backgroundConfig.stroke, c.backgroundConfig.strokeAlpha);


        let txt = c.scene.add.text(0, 0, c.text, c.textConfig).setOrigin(0.5);

        txt.setScale(Math.min(bg.width * c.wRatio / txt.width, bg.height * c.hRatio / txt.height));
        txt.setPosition(bg.width * (c.xRatio - 0.5), bg.height * (c.yRatio - 0.5));

        btn.add(bg);
        btn.add(txt);

        btn.background = bg;
        btn.text = txt;

        btn.width = bg.width;
        btn.height = bg.height;

        if (!(c.callback === null || c.callback === undefined)) {
            btn.setInteractive(new Phaser.Geom.Rectangle(0, 0, c.backgroundConfig.width, c.backgroundConfig.height), Phaser.Geom.Rectangle.Contains);
            btn.on("pointerdown", c.callback);
        }
        return btn;
    }

    /**
     * @description Lists the properties of the helper to the console
     *
     * @static
     * @memberof ButtonHelper
     * 
     * @author Kadir Mert Okumuş <kadirmertokumus@gmail.com>
     */
    static help() {
        let list = Object.getOwnPropertyNames(ButtonHelper);
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
export default ButtonHelper;