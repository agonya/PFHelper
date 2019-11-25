/**
 * @classdesc
 * MathsHelper aims to aid you in doing somewhat complicated mathematical algorithms. <br>
 * It mainly has functions that are easy to calculate, but are susceptible of repeated usage in normal code. <br>
 * So, we wrapped functions that we liked and put them in MathsHelper for you. <br>
 *
 * @class MathsHelper
 * 
 * @author Tayfun Turgut <tyfn.trgt@gmail.com>
 * 
 * @memberof PFHelper
 */

class MathsHelper {

    /**
     * @description Constrains the input between min and max values. <br>
     * Useful especially when you don't know the return value of input and want to constrain it somehow. 
     *
     * @static
     * @function
     * 
     * @param {number} [input=0] - Input value to be constrained
     * @param {number} [min=0] - Minimum value of the constrain
     * @param {number} [max=1] - Maximum value of the constrain
     * @returns {number}
     * 
     * @memberof MathsHelper
     */
    static constrainNumber(input = 0, min = 0, max = 1) {
        if (input < min) {
            return min;
        } else if (input > max) {
            return max;
        } else {
            return input;
        }
    }

    /**
     * @description Finds the distance between two 2D objects. <br>
     * If you want to use points and not Phaser objects, then pass parameters as: <br>
     * dist({x: x1 , y: y1}, {x: x2, y: y2});
     *
     * @static
     * @function
     * 
     * @param {object} obj1 - First object
     * @param {object} obj2 - Second object
     * @returns {number}
     * 
     * @memberof MathsHelper
     */
    static dist(obj1, obj2) {
        return Math.sqrt(Math.pow(obj2.x - obj1.x, 2) + Math.pow(obj2.y - obj1.y, 2));
    }

    /**
     * @description Linearly maps value from the range (a..b) to (c..d)
     *
     * @static
     * @function
     * 
     * @param {number} [value=0] - The value to be mapped
     * @param {number} [a=0] - Lower boundary of input
     * @param {number} [b=1] - Upper boundary of input
     * @param {number} [c=0] - Lower boundary of output
     * @param {number} [d=1] - Upper boundary of output
     * @returns {number}
     * 
     * @memberof MathsHelper
     */
    static mapValue(value = 0, a = 0, b = 1, c = 0, d = 1) {
        value = (value - a) / (b - a);

        return c + value * (d - c);
    }

    /**
     * @description Convert number to K-M-B notation, with given decimals, <br>
     * and constrains the number to positive or negative region if needed.
     *
     * @static
     * @function
     * 
     * @param {number} [num=0] - The number to be converted
     * @param {number} [decimal=0] - The number of decimal places to be used in the conversion. Can be 0, 1 or 2
     * @param {string} [constrain="none"] - "pos": positive constrain, "neg": negative constrain, "none": no constrain
     * @returns {string}
     * 
     * @memberof MathsHelper
     */
    static convertNumToCustomFormat(num = 0, decimal = 0, constrain = "none") {
        let newNum;
        if (constrain == "pos") {
            newNum = this.constrainNumber(num, 0, Infinity).toFixed(0);
        } else if (constrain == "neg") {
            newNum = this.constrainNumber(num, -1 * Infinity, 0).toFixed(0);
        } else if (constrain == "none") {
            newNum = num.toFixed(0)
        }

        let preNum = newNum;
        if (newNum.length >= 10) {
            preNum = `${newNum.slice(0, newNum.length - 9)}`;
        } else if (newNum.length >= 7) {
            preNum = `${newNum.slice(0, newNum.length - 6)}`;
        } else if (newNum.length >= 4) {
            preNum = `${newNum.slice(0, newNum.length - 3)}`;
        }

        let dot = "";
        if (decimal > 0 && newNum.length >= 4) {
            dot = ".";
        }

        let postNum = "";
        if (newNum.length >= 10) {
            postNum = `${newNum.slice(newNum.length - 9, newNum.length - 9 + decimal)}`;
        } else if (newNum.length >= 7) {
            postNum = `${newNum.slice(newNum.length - 6, newNum.length - 6 + decimal)}`;
        } else if (newNum.length >= 4) {
            postNum = `${newNum.slice(newNum.length - 3, newNum.length - 3 + decimal)}`;
        }

        let postLetter = "";
        if (newNum.length >= 10) {
            postLetter = `B`;
        } else if (newNum.length >= 7) {
            postLetter = `M`;
        } else if (newNum.length >= 4) {
            postLetter = `K`;
        }

        return preNum + dot + postNum + postLetter;
    }

    /**
     * @description Generate a blank array in which the value of the elements of the array are equal to their index numbers. <br>
     * This way, you can just use "for (let i of generateBlankArray(n))" instead of using the "i" syntax. <br>
     * This is for simplifying "for" loops and must only be used for the most basic cases.
     *
     * @static
     * @function
     * 
     * @param {number} [n=0] - Number of elements in the array
     * @param {boolean} [ascending=true] - Changes whether the blank array ascend or descend in values.
     * @returns {object}
     * 
     * @memberof MathsHelper
     */
    static generateBlankArray(n = 0, ascending = true) {
        let tempArray = [];
        if (ascending) {
            for (let i = 0; i < n; i++) {
                tempArray.push(i);
            }
        } else {
            for (let i = n - 1; i > -1; i--) {
                tempArray.push(i);
            }
        }

        return tempArray;
    }

    /**
     * @description Rotate a 2D array of x-y couples wrt a point array containing an x-y couple and an angle.
     *
     * @static
     * @param {Array} array The 2D array to rotate
     * @param {Array} point Rotation pivot array containing x-y values
     * @param {number} angle The angle to rotate the values
     * 
     * @returns {Array}
     * 
     * @memberof MathsHelper
     */
    static rotateArray(array, point, angle) {
        let final = [];
        for (let i = 0; i < array.length; i++) {
            final[i] = [];
            let x1 = array[i][0] - point[0];
            let y1 = array[i][0] - point[1];
            let x2 = Math.cos(angle) * (x1) - Math.sin(angle) * y1;
            let y2 = Math.sin(angle) * (x1) + Math.cos(angle) * y1;
            final[i][0] = x2 + point[0];
            final[i][1] = y2 + point[1];
        }
        return final;
    }
}

export default MathsHelper;