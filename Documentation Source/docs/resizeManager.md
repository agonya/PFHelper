# ResizeManager

## Introduction

The default resize manager used by the object register. Comes as default when importing PFHelper. It's usage is preferential, but recommended. It is added to each scene and is accessed via that scene.

!!! warning "Resize function naming difference"
    To prevent multiple triggers of resizing, here, the resize functions are simply named `resize` and can be accessed directly by typing `test.resize()`.

* Author: Berkecan Gürer

## Functions List

* [add()](#add)
* [remove()](#remove)
* [resize()](#resize)

## Usage

<a name="add"></a>

### add

- Adds an object to the resize manager, to the given scene.

Adds an object to the resize manager, to the given scene. Inside the resize function, this always scopes to the given object.

    :::javascript
    scene.resizeManager.add(object, resizeFunction);

- `object: {}`: The object to be resized
- `resizeFunction`: The function which will be applied to the specified object

- Example:

        :::javascript
        let test = ui.add.image(0, 0, "intro_bg");
        ui.resizeManager.add(test, function() {
            this.setScale(Math.max(
                lastWidth / this.width,
                lastHeight / this.height
            ));
            this.x = lastWidth / 2;
            this.y = lastHeight / 2;
        });
        console.log(test.resize);
        // f () resize

<a name="remove"></a>

### remove

- Removes an object from the resize manager.

Removes an object from the resize manager, preferable because you want to destroy it.

    :::javascript
    scene.resizeManager.remove(object);

- `object: {}`: The object to be removed from the manager

- Example:

        :::javascript
        let test = ui.add.image(0, 0, "intro_bg");
        ui.resizeManager.add(test, function() {
            this.setScale(Math.max(
                lastWidth / this.width,
                lastHeight / this.height
            ));
            this.x = lastWidth / 2;
            this.y = lastHeight / 2;
        });
        // later on..
        ui.resizeManager.remove(test);
        test.destroy();
        // success

<a name="resize"></a>

### resize

- Resize all objects.

This is the bread and butter of the resize manager. Runs the resize function of all objects registered to this resize manager.

Note that this function should be added to the resizeAll() function in the template.

    :::javascript
    scene.resizeManager.resize();

- Example:

        :::javascript
        ui.resizeManager.resize();
        // resize all objects registered in ui resize manager