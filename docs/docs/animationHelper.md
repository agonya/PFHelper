# Animations Helper

## Introduction

AnimationHelper has been written to facilitate the animations we often use in our projects.

* Author: Tayfun Turgut

## Functions List

* [createBurstFlowAnimation()](#createBurstFlowAnimation)
* [pulsate()](#pulsate)
* [unpulsate()](#unpulsate)
* [buttonify()](#buttonify)

<a name="createBurstFlowAnimation"></a>

## Create Burst Flow Animation 

This animation is produced as many times as desired from the given object and goes to the given position in the given time.</br>
It's very helpful when you have to create gold flow animation like idle games.

### Usage

    :::javascript
    PFHelper.createBurstFlowAnimation(from, to, amount, key, duration);

* `from` Object that contains x and y value. Refers to the starting point of the objects to be created. (obj)
* `to` Object that contains x and y value. Refers to the end point of the objects to be created. (obj)
* `amount` Number of the objects to be created. (number)
* `key` Key of the image that wanted to create. (string)
* `duration` Duration of the animation. (number)



<a name="pulsate"></a>

## Pulsate

Creates pulse animation for buttons.

### Usage

    :::javascript
    PFHelper.pulsate(target, scaleMultiplier, duration);

* `target` An object to animate. (obj)
* `scaleMultiplier` The value to be multiplied by the original scale value. This value indicates how much the object will pulse. (float)
* `duration` Duration of the animation. (number)


<a name="unpulsate"></a>

## Unpulsate

Removes the pulse animation that created from "`Pulsate`" function.

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
