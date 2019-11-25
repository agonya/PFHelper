# Animations Helper

## Introduction

AnimationHelper has been written to facilitate the animations we often use in our projects.

* Author: Tayfun Turgut, Berkecan Gürer

## Functions List

* [createBurstFlowAnimation()](#createBurstFlowAnimation)
* [pulsate()](#pulsate)
* [unpulsate()](#unpulsate)
* [buttonify()](#buttonify)

<a name="createBurstFlowAnimation"></a>

## Create Burst Flow Animation 

This animation is produced by creating the given object as many times as desired and goes to the given position in the given time.</br>
It's very helpful when you have to create gold flow animation like idle games.

### Usage

    :::javascript
    PFHelper.createBurstFlowAnimation(from, to, amount, atlas, key, duration);

* `from` Object that contains x and y values. Refers to the starting point of the objects to be created. (obj)
* `to` Object that contains x and y values. Refers to the end point of the objects to be created. (obj)
* `amount` Number of the objects to be created. (number)
* `atlas` Does the texture of the key come from an atlas? (boolean)
* `key` Key of the image that is wanted to create. (string)
* `duration` Duration of the animation in seconds. (number)



<a name="pulsate"></a>

## Pulsate

Creates pulse animation for buttons.

### Usage

    :::javascript
    PFHelper.pulsate(target, scaleMultiplier, duration);

* `target` An object to animate. (obj)
* `scaleMultiplier` The value to be multiplied by the original scale value. This value indicates how much the object will pulse. We recommend you to give a number between 0-1 to create an "invard" pulse to avoid resizing issues. (float)
* `duration` Duration of the animation in milliseconds. (number)


<a name="unpulsate"></a>

## Unpulsate

Removes the pulse animation that was created by the "`Pulsate`" function.

### Usage

    :::javascript
    PFHelper.unpulsate(target);

* `target` An animated object. (obj)

<a name="buttonify"></a>


## Buttonify

To create a feeling when a button is pressed, it creates an animation that decreases its scale while it is pressed. Also it calls callback function when the button is clicked.

### Usage

    :::javascript
    PFHelper.buttonify(target, callback);

* `target` An object (preferably a button) for click animation. (obj)
* `callback` Callback function that calls after button is clicked. (function)
