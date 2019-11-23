# MathsHelper

## Introduction

MathsHelper aims to aid you in doing somewhat complicated mathematical algorithms. It mainly has functions that are easy to calculate, but are susceptible of repeated usage in normal code. So, we wrapped functions that we liked and put them in MathsHelper for you.

* Author: Tayfun Turgut

## Usage

### constrainNumber

- Sandwich a number between two numbers

Constrains the input between min and max values. Useful especially when you don't know the return value of input and want to constrain it somehow.

    :::javascript
    let num = PFHelper.constrainNumber(input, min, max)

- `input: 0`: Input value to be constrained
- `min: 0`: Minimum value of the constrain
- `max: 1`: Maximum value of the constrain
- Example:

        :::javascript
        let lastWidth = 25;
        let test = PFHelper.constainNumber(lastWidth, 10, 20);
        console.log(test);
        // 20

### dist

- Distance finder

Finds the distance between two 2D objects.

    :::javascript
    let num = PFHelper.dist(obj1, obj2)

- `obj1`: First object
- `obj2`: Second object
- Example:

        :::javascript
        let test = PFHelper.dist(rect1, rect2);
        console.log(test);
        // 5.2

!!! info "This function can be used with any two points!"
        If you want to use points and not legit Phaser objects, then pass parameters as:
        
        `dist({x: x1 , y: y1}, {x: x2, y: y2})`

        See [{Phaser Object}](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/gameobject/)

- Example:

        :::javascript
        let test = PFHelper.dist({x: 2, y: 2}, {x: 5, y: 6});
        console.log(test);
        // 5

### mapValue

- Linearly maps value from the range (a..b) to (c..d)

"If input is between a and b, what does it correlate if it was between c and d instead?"

    :::javascript
    let num = PFHelper.mapValue(value, a, b, c, d)

- `value: 0`: The value to be mapped
- `a: 0`: Lower boundary of input
- `b: 1`: Upper boundary of input
- `c: 0`: Lower boundary of output
- `d: 1`: Upper boundary of output

- Example:

        :::javascript
        let test = PFHelper.mapValue(0.5, 0, 1, 0, 100);
        console.log(test);
        // 50

### convertNumToCustomFormat

- 1.000 is K, 1.000.000 is M, 1.000.000.000 is B..

Convert number to K-M-B notation, with given decimals, and constrains the number to positive or negative region if needed.
See [the 'aa' notation](https://gram.gs/gramlog/formatting-big-numbers-aa-notation/)

    :::javascript
    let num = PFHelper.convertNumToCustomFormat(num, decimal, constrain)

- `num: 0`: The number to be converted
- `decimal: 0`: The number of decimal places to be used in the conversion. Can be 0, 1 or 2
- `constrain: "none"`: "pos": positive constrain, "neg": negative constrain, "none": no constrain

- Example:

        :::javascript
        let test = PFHelper.convertNumToCustomFormat(10000, 1, "pos")
        console.log(test);
        // 10.0K