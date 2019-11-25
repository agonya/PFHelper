# ObjectRegister

## Introduction

One instance per Phaser Scene is automatically created when PFHelper is imported. ObjectRegister is responsible for keeping track of objects, automatically asigning them resize functions and most importantly, gives them names.

The functions are called from the scene objectRegister is instantiated within.

The system works like this: Every scene has an object register in it and you submit objects to it by giving a `segment` and a `name`. Later on, you can just get the objects registered with the same `segment` or you can just get the object with the `name` you gave.

All functions which create new objects sets the origin to `(0.5, 0.5)` by default, so you must change it according to your needs if necessary.

See [{Phaser Scene}](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/)

* Author: Tayfun Turgut

## Functions List

* [registerObj()](#registerObj)
* [registerImage()](#registerImage)
* [registerRectangle()](#registerRectangle)
* [getObject()](#getObject)
* [getSegment()](#getSegment)
* [removeSegment()](#removeSegment)

## Usage

<a name="registerObj"></a>

### registerObj

- Register any arbitrary object to the manager.

Register any object. Note that you must provide the object with its resize function for full functionality. Registers objects with the following format: `segmentName`. You can manually get and log the objects array from: `Phaser Scene => objectRegister => {object} objects`. The function returns the object itself.

    :::javascript
    let obj = scene.objectRegister.registerObj(config = {
        segment,
        name,
        obj
    });

- `segment: "game"`: The segment of the object
- `name: "temp"`: The name of the object
- `obj: {}`: The object to register

- Example:

        :::javascript
        let tempObj = ui.add.rectangle(0, 0, 100, 100).setFillStyle(0x000000, 1);
        ui.resizeManager.add(tempObj, function() {
            this.setScale(Math.max(
                lastWidth / this.width,
                lastHeight / this.height
            ));
            this.x = lastWidth / 2;
            this.y = lastHeight / 2;
        });
        let test = ui.objectRegister.registerObj({
            segment: "intro",
            name: "background",
            obj: tempObj
        });
        console.log(test);
        // tempObj
        console.log(test.segment);
        // intro
        console.log(test.name);
        // background

<a name="registerImage"></a>

### registerImage

- Register an image to the manager.

Registers an image to the manager. Here, you don't need to specify the resize functionality beforehand, rather you can just give it as a parameter and the manager will add it for you. Registers objects with the following format: `segmentName`. You can manually get and log the objects array from: `Phaser Scene => objectRegister => {object} objects`. The function returns the object itself.

    :::javascript
    let obj = scene.objectRegister.registerImage(config = {
        segment,
        name,
        atlas,
        key,
        scale,
        position
    });

- `segment: "game"`: The segment of the object
- `name: "temp"`: The name of the object
- `atlas: false`: If the iamge is part of an atlas.
- `key: ""`: The key of the image
- `scale: function() {return 1;}`: The function which returns the desired scale of the image.
    - Note that the function must `return`the scale of the function, so that it can be calculated in the runtime.
- `position: function() {return {x: 0, y: 0};}`: The function which returns the desired position object of the image.
    - Note that the function must `return`the position of the function, as another object containing x and y values, so that it can be calculated in the runtime.

- Example:

        :::javascript
        let introRect = ui.objectRegister.registerImage({
            segment: "intro",
            name: "background",
            atlas: false,
            key: "intro_bg",
            scale: function() {
                return Math.max(
                    lastWidth / this.width,
                    lastHeight / this.height
                )
            },
            position: function() {
                return {
                    x: lastWidth / 2,
                    y: lastHeight / 2
                }
            }
        });

<a name="registerRectangle"></a>

### registerRectangle

- Register a rectangle to the manager.

Registers a rectangle to the manager. Here, you don't need to specify the resize functionality beforehand, rather you can just give it as a parameter and the manager will add it for you. Registers objects with the following format: `segmentName`. You can manually get and log the objects array from: `Phaser Scene => objectRegister => {object} objects`. The function returns the object itself.

    :::javascript
    let obj = scene.registerRectangle(config = {
        segment,
        name,
        scale,
        position
    });

- `segment: "game"`: The segment of the object
- `name: "temp"`: The name of the object
- `scale: function() {return {scaleX: 1, scaleY: 1};}`: The function which returns the desired scale of the image.
    - Note that the function must `return`the scale of the function, so that it can be calculated in the runtime. Unlike the previous example, here we must give scaleX and scaleY values seperately to ensure the dimensions of the rectangle.
- `position: function() {return {x: 0, y: 0};}`: The function which returns the desired position object of the image.
    - Note that the function must `return`the position of the function, as another object containing x and y values, so that it can be calculated in the runtime.

- Example:

        :::javascript
        let introRect = ui.objectRegister.registerImage({
            segment: "intro",
            name: "background",
            scale: function() {
                return {
                    scaleX: lastWidth / this.width,
                    scaleY: lastHeight / this.height
                }
            },
            position: function() {
                return {
                    x: lastWidth / 2,
                    y: lastHeight / 2
                }
            }
        });

<a name="getObject"></a>

### getObject

- Get an object based on its segment and name.

Gets an object from register by segment and name.

    :::javascript
    let obj = scene.objectRegister.getObject(segment, name);

- `segment: "game"`: The segment of the object
- `name: "temp"`: The name of the object

- Example:

        :::javascript
        let test = ui.objectRegister.getObject("intro", "background");
        console.log(test);
        // {object} introBackground

<a name="getSegment"></a>

### getSegment

- Get all objects registered to the specified segment.

Returns an array that contains all objects registered in the given segment.

    :::javascript
    let array = scene.objectRegister.getSegment(segment);

- `segment: "game"`: The segment of the object

- Example:

        :::javascript
        let test = ui.objectRegister.getSegment("intro");
        console.log(test);
        // {array} [introBackground]

<a name="removeSegment"></a>

### removeSegment

- Remove all objects registered to the specified segment.

Removes (removes from resizemanager and Phaserly destroys) all objects registered in the given segment. Note that all these objects must be Phaser objects, so caution is advised, especially when working with particle emitters vs, since they can't be Phaserly destroyed. It could be wise to register it with another segment. See [Particle Emitter](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/particles/)



    :::javascript
    scene.objectRegister.removeSegment(segment);

- `segment: "game"`: The segment of the object

- Example:

        :::javascript
        ui.objectRegister.removeSegment("intro");
        let test = ui.objectRegister.getSegment("intro");
        console.log(test);
        // []