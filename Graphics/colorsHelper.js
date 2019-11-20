import colorsJSON from "./colors.json";

/**
 * @classdesc
 * ColorsHelper has many functions regarding colors.
 * The main reason this was created is to enable users to choose colors from a predetermined set.
 *
 * @class ColorsHelper
 * @memberof PFHelper
 * 
 * @author Tayfun Turgut <tyfn.trgt@gmail.com>
 * @author Tunahan Gormus <tunahangormus@gmail.com>
 */
class ColorsHelper {

    /**
     * @description Converts the color from color palette to code usable Phaser Color Type. <br>
     * Example colors: <br>
     * red, pink, purple, deeppurple, indigo, blue, lightblue, cyan, teal, green, <br>
     * lightgreen, lime, yellow, amber, orange, deeporange, brown, grey, bluegrey <br>
     * Subcodes: <br>
     * 50, 100, 200, ... 900, (a100, a200, a400, a700) <br>
     *
     * @static
     * @param {string} [colorString=""] - A string representing the main name of the color e.g. "red"
     * @param {string} [subCode=""] - A subcode to the main color which darkens it as it is increased. Leave this as "" to get color from palette.
     * @param {boolean} [hex=true] - false: returns a number instead of color with "#" prefix
     * @returns {(string|number|boolean)}
     * 
     * @author Tayfun Turgut <tyfn.trgt@gmail.com>
     * @author Tunahan Gormus <tunahangormus@gmail.com>
     * 
     * @memberof ColorsHelper
     */
    static getColor(colorString = "", subCode = "", hex = true) {

        let colorsWithSubs = false;
        if ((typeof colorString) == "string") {
            if (colorString.length == 0) {
                console.warn(`ColorsHelper.GetColor : 0 length color string was given!
                Log => colorString: ${colorString}`);
                return false;
            } else {
                if (subCode.length == 0) {
                    if (!colorsJSON.colorPalette[colorString]) {
                        if (!colorsJSON.colorsWithSubs[colorString]) {
                            console.warn(`ColorsHelper.GetColor : Invalid color string!
                            Log => colorString: ${colorString}`);
                            return false;
                        } else {
                            colorsWithSubs = true;
                        }
                    }
                } else {
                    if (!colorsJSON.colorsWithSubs[colorString]) {
                        if (!colorsJSON.colorPalette[colorString]) {
                            console.warn(`ColorsHelper.GetColor : Invalid color string!
                            Log => colorString: ${colorString}`);
                            return false;
                        } else {
                            colorsWithSubs = false;
                        }
                    } else {
                        if (!(typeof subCode) == "string") {
                            console.warn(`ColorsHelper.GetColor : Sub code must be of type "integer"!
                            Log => subCode: ${subCode}`);
                            return false;
                        } else {
                            if (!colorsJSON.colorsWithSubs[colorString][subCode]) {
                                console.warn(`ColorsHelper.GetColor : Invalid sub code
                                Log => subCode: ${subCode}`);
                                return false;
                            } else {
                                colorsWithSubs = true;
                            }
                        }
                    }
                }
            }
        } else {
            console.warn(`ColorsHelper.GetColor : Color string must be of type "string"!
            Log => colorString: ${colorString}`);
            return false;
        }

        if (colorsWithSubs) {
            if (subCode.length == 0) {
                subCode = 900;
            }
            if (hex) {
                return colorsJSON.colorsWithSubs[colorString][String(subCode)];
            } else {
                // convert color to hexadecimal number
                return Phaser.Display.Color.HexStringToColor(colorsJSON.colorsWithSubs[colorString][String(subCode)]).color;
            }
        } else {
            if (hex) {
                return colorsJSON.colorPalette[colorString];
            } else {
                // convert color to hexadecimal number
                return Phaser.Display.Color.HexStringToColor(colorsJSON.colorPalette[colorString]).color;
            }
        }
    }

    /**
     * @description Returns a random color
     *
     * @static
     * @memberof ColorsHelper
     * @param {boolean} [hex=true] - false: returns a number instead of color with "#" prefix
     * 
     * @author Tunahan Gormus <tunahangormus@gmail.com>
     * @returns {(string|boolean)}
     */
    static getRandomColor(hex = true) {
        let randomColor = (Math.random() * 0xFFFFFF << 0).toString(16);
        return hex ? "#" + randomColor : "0x" + randomColor;
    }

    /**
     * @description Returns a gradient color array from given start color and end color.
     *
     * @static
     * @memberof ColorsHelper
     * @param {string} [startColor = ""] A string representing "start color" of the gradient array.
     * @param {string} [endColor = ""] A string representing "end color" of the gradient array.
     * @param {number} [colorCount = 10] Size of the gradient array.
     * @param {boolean} [hex=true] - false: returns a number instead of color with "#" prefix
     * 
     * @author Tunahan Gormus <tunahangormus@gmail.com>
     * @author Euler Junior <https://stackoverflow.com/users/5274306/euler-junior>
     * @returns {(array|boolean)}
     */
    static getGradientColor(startColor = "", endColor = "", colorCount = 10, hex = true) {
        if ((typeof startColor) != "string") {
            console.warn(`ColorsHelper.getGradientColor : Start color must be of type "string"!
            Log => startColor: ${startColor}`);
            return false;
        } else {
            if ((typeof endColor) != "string") {
                console.warn(`ColorsHelper.getGradientColor : End color must be of type "string"!
                Log => endColor: ${endColor}`);
                return false;
            } else {
                if (!Number.isInteger(colorCount)) {
                    console.warn(`ColorsHelper.getGradientColor : Color count must be of type "integer"!
                    Log => colorCount: ${colorCount}`);
                    return false;
                }
            }
        }

        let start = this.convertToRGB(startColor);
        let end = this.convertToRGB(endColor);
        let alpha = 0.0;
        let colors = [];

        for (var i = 0; i < colorCount; i++) {
            let c = [];
            alpha += (1.0 / colorCount);

            c[0] = end[0] * alpha + (1 - alpha) * start[0];
            c[1] = end[1] * alpha + (1 - alpha) * start[1];
            c[2] = end[2] * alpha + (1 - alpha) * start[2];

            colors.push(this.convertToHex(c, hex));
        }
        return colors;
    }

    /**
     * @description Similar to mapValue, this function lerps one color towards other and you can get any intermediate color with ratio.
     *
     * @static
     * @memberof ColorsHelper
     * @param {string} [startColor = ""] A string representing "start color" of the gradient array.
     * @param {string} [endColor = ""] A string representing "end color" of the gradient array.
     * @param {number} [ratio = 1] A number between 0-1 to get the intermediate color.
     * @param {string} [hex = "true"] false: returns a number instead of color with "#" prefix
     * 
     * @author Tunahan Gormus <tunahangormus@gmail.com>
     * @returns {string}
     */
    static colorLerp(startColor = "", endColor = "", ratio = 1, hex = true) {
        if ((typeof startColor) != "string") {
            console.warn(`ColorsHelper.colorLerp : Start color must be of type "string"!
            Log => startColor: ${startColor}`);
            return false;
        } else {
            if ((typeof endColor) != "string") {
                console.warn(`ColorsHelper.colorLerp : End color must be of type "string"!
                Log => endColor: ${endColor}`);
                return false;
            } else {
                if ((typeof ratio) != "number") {
                    console.warn(`ColorsHelper.colorLerp : Ratio must be of type "number"!
                    Log => ratio: ${ratio}`);
                    return false;
                }
            }
        }

        let start = this.convertToRGB(startColor);
        let end = this.convertToRGB(endColor);

        if (ratio > 1)
            ratio = 1;
        else if (ratio < 0)
            ratio = 0;

        let c = [];
        c[0] = end[0] * ratio + (1 - ratio) * start[0];
        c[1] = end[1] * ratio + (1 - ratio) * start[1];
        c[2] = end[2] * ratio + (1 - ratio) * start[2];

        return (this.convertToHex(c, hex));
    }

    /**
     * @description Convert RGB to hex string
     *
     * @static
     * @memberof ColorsHelper
     * @param {array} [rgb = [0, 0, 0]] An array which contains the RGB values
     * @param {string} [hex = true] false: returns a number instead of color with "#" prefix
     * 
     * @author Tunahan Gormus <tunahangormus@gmail.com>
     * @returns {(array|false)}
     */
    static convertToHex(rgb = [0, 0, 0], hex = true) {
        if (!Array.isArray(rgb)) {
            console.warn(`ColorsHelper.convertToHex : RGB must be of type "array"!
            Log => rgb: ${rgb}`);
            return false;
        }

        let calculateHex = function (c) {
            let s = "0123456789abcdef";
            let i = parseInt(c);
            if (i == 0 || isNaN(c))
                return "00";
            i = Math.round(Math.min(Math.max(0, i), 255));
            return s.charAt((i - i % 16) / 16) + s.charAt(i % 16);
        }

        let hexColor = calculateHex(rgb[0]) + calculateHex(rgb[1]) + calculateHex(rgb[2]);
        return hex ? "#" + hexColor : "0x" + hexColor;
    }


    /**
     * @description Convert a hex string to an RGB triplet
     *
     * @static
     * @memberof ColorsHelper
     * @param {string} [hex = ""] Hex string "can start with '#' or '0x' or without any"
     * 
     * @author Tunahan Gormus <tunahangormus@gmail.com>
     * @returns {(array|false)}
     */
    static convertToRGB(hex) {
        if ((typeof hex) != "string") {
            console.warn(`ColorsHelper.convertToRGB : Hex must be of type "string"!
            Log => hex: ${hex}`);
            return false;
        }

        let trim = function (s) {
            if (s.charAt(0) == '#') {
                return s.substring(1, 7);
            } else if (s.charAt(0) == '0' && s.charAt(1) == 'x') {
                return s.substring(2, 8);
            } else {
                return s;
            }
        };

        let color = [];
        color[0] = parseInt((trim(hex)).substring(0, 2), 16);
        color[1] = parseInt((trim(hex)).substring(2, 4), 16);
        color[2] = parseInt((trim(hex)).substring(4, 6), 16);
        return color;
    }
}

export default ColorsHelper;