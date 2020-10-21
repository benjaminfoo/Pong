"use strict";

/**
 * Author: Vorname Nachname (email@ostfalia.de) - Mat.Nr.
 *
 * This is the player-class of the pong-project.
 *
 * It is a simple. pojo-styled ECMAScript6 class which is only used as a data-container.
 * The logic of the behaviour is implemented within the Pong.js file (and partly in the Ball.js file ... )
 */
class Player {

    constructor(context, name, x, y, width, height, fillStyle) {
        this.context = context;
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fillStyle = fillStyle
        this.highscore = 0;
    }

    update(){
        this.context.fillStyle = this.fillStyle;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    // used as patial reset (when the game-round/turn restarts)
    resetPosition(firstPlayer){
        this.x = firstPlayer ? 20 : canvas.width - 20*2;
        this.y = (this.context.canvas.height / 2) - (this.height / 2);
    }

    // used as the total reset (when the game restarts)
    reset(firstPlayer){
        this.resetPosition(firstPlayer);
        this.highscore = 0;
    }

}
