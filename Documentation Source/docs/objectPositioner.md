# Object Positioner

## Introduction

Object Positioner is a helper that uses grids to position an object to a specific index.

* Author: Talha Özdemir

## Functions List

* [placeAtIndex()](#placeAtIndex)

<a name="placeAtIndex"></a>

## Place At Index

    :::javascript
    scene.objectPositioner.placeAtIndex(index, obj, scale, w, h);
    
* `index` The index value that object will be positioned in (number)
* `obj` The object that will be positioned, this object can be image, text and container. If you want to use graphics object you can add it to the container. (object)
* `scale: 1` This represents grid number that object will be scaled to. For example if the scale value is 1 so, the object will be scaled to '1 row heigt' or '1 column width'. It will choose smaller one. (number)
* `w` Screen width (number)
* `h` Screen height. (number)


&nbsp;

## Usages

### In startGame() function

:::javascript
    let config = {
		scene: this,
        cols: 11, // must be between 5 and 20.
        rows: 7, // must be between 5 and 20.
        debug: true
    };

    objectPositioner = new scene.objectPositioner(config);
    button = this.add.image(0, 0, "atlas", "button"); // sample button

### In resizeAll() function

:::javascript
    objectPositioner.resize();
    if (w > h) {
		objectPositioner.placeAtIndex(17, button, 1, w, h)
    } else {
        objectPositioner.placeAtIndex(22, button, 3, w, h)
    }

![Sample grid]('../images/object-positioner-example.png')