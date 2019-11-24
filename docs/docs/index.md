# Home

## Playable Factory In-House Helper Library (PFHelper)

PFHelper is a library that was created for one simple purpose: to make the resident HTML5 developer's life a little bit easier. It is fully open sourced, and any member of the firm can edit and contribute the classes.

* Authors: Tayfun Turgut, Tunahan Görmüş, Kadir Mert Okumuş

## Usage

### Using PFHelper

- PFHelper is imported into a project by following these steps:
    - At the very top of the `game.js` file in templatePhaser2D, add the following line under `import 'phaser'`:

            :::javascript
            import PFHelperConstructor from "../PFHelper/pfHelper";

    - Under the global variables `lastWidth`, `lastHeight` etc. add `PFHelper` global variable:

            :::javascript
            let lastWidth, lastHeight, aspectRatio, isLandscape,
            squareness, main, data, gameEnded = false, scene, ui;
            let PFHelper;

    - Under `startGame()`, instantiate the imported library using the following configuration object:

            :::javascript
            PFHelper = new PFHelperConstructor({
                game: app.main.game,
                colors: true,
                maths: true,
                dynamicTween: true,
                timer: true,
                tweenTrain: true,
                utility: true
            });

        - `game: app.main.game`: This parameter needs the main Phaser Game object.
            See [{Phaser Game}](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/game/)
        - `colors`: Enables ColorsHelper library.
            - Description: ColorsHelper has many functions regarding colors. The main reason this was created is to enable users to choose colors from a predetermined set.
        - `maths`: Enables MathsHelper library.
            - Description: MathsHelper aims to aid you in doing somewhat complicated mathematical algorithms. It mainly has functions that are easy to calculate, but are susceptible of repeated usage in normal code. So, we wrapped functions that we liked and put them in MathsHelper for you.
        - `dynamicTween`: Enables DynamicTween library.
            - Description: A Tween is able to manipulate the properties of one or more objects to any given value, based on a duration and type of ease. They are rarely instantiated directly and instead should be created via the TweenManager. Dynamic Tween gets that idea of a tween and converts it into a real powerhouse.
        - `timer`: Enables Timer library.
            - Description: This library enables you to create, pause, resume and stop any number of timers for in-game uses.
        - `tweenTrain`: Enables TweenTrain library.
            - Description: A highly contreversial but useful library that is right on the middle spot of a tween and a dynamic tween.
        - `utility`: Enables UtilityHelper library.
            - Description: This helper class contains functions that can make your life easier when developing the playables. They are mainly object manipulation wrappers, such as pulsating an object or creating a flow of gold from an origin to a target.

    - After this, we think that calling `resizeAll(lastWidth, lastHeight)` is beneficial.

    - You are ready to go!