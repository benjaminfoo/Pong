"use strict";

/**
 * Author: Vorname Nachname (email@ostfalia.de) - Mat.Nr.
 *
 * This is the ball-class of the pong-project.
 *
 * It contains various attributes like the position, the radius, styling, etc.
 * Within the update()-method, the position and the overall behaviour of the ball is implemented.
 */

class Ball {

    constructor(context, x, y, radius, fillStyle, xDir, yDir, player1, player2) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.fillStyle = fillStyle;
        this.xDir = xDir;
        this.yDir = yDir;
        this.player1 = player1;
        this.player2 = player2;
    }

    /* Handle the movement of the ball */
    update() {
        if(!Utils.option_togglePause){
            // Calculate the next position of the ball
            // add the direction vector to the position of the ball
            var nextX = this.x + this.xDir;
            var nextY = this.y + this.yDir;


            // ball comes from above => handle collision with the border on the south
            if (nextY + this.radius > canvas.height) {
                // invert the y-direction vector component
                // (so it will glide in the opposite direction)
                this.yDir = -Math.abs(this.yDir);

                Utils.playSound_BorderCollision();
            }

            // ball comes from below => handle collision with the border on the north
            if (nextY < 0) {
                // use the regular y-direction vector component
                // (so it will glide in the opposite direction)
                this.yDir = Math.abs(this.yDir);

                Utils.playSound_BorderCollision();
            }


            // ball comes from left => increase the highscore of player 1, reset the round
            if (nextX + this.radius > canvas.width) {
                // IN ORIGINAL PONG - there is no such thing like a east wall!
                // invert the x-direction vector component
                // (so it will glide in the opposite direction)
                //
                // this.xDir = -Math.abs(this.xDir);

                Utils.playSound_BallOut();
                player1.highscore++;
                this.resetRound();
            }

            // ball comes from the right => increase the highscore of player 2, reset the round
            if (nextX < 0) {
                // IN ORIGINAL PONG - there is no such thing like a east wall!
                //
                // use the regular x-direction vector component
                // (so it will glide in the opposite direction)
                // this.xDir = Math.abs(this.xDir);


                Utils.playSound_BallOut();
                player2.highscore++;
                this.resetRound();
            }



            // handle collision with player 1
            //
            // x-pos check:
            // if the next calculated x position is equal to the first players x-position and width ...
            if (nextX - this.radius < player1.x) {
                // height check:
                //
                // if the ball's y-position is above the players position (bottom-left-anchor-point)
                // and if the y-position below the players position width its height added ...
                if (nextY > this.player1.y - this.radius
                    && nextY < (this.player1.y + this.player1.height)) {
                    // set the x-direction vector to the 'regular' direction (i.e. make it bounce from the pad)
                    this.xDir = Math.abs(this.xDir);
                    Utils.playSound_PlayerCollision();

                    // with every tick, we speed up the ball a litte ... NOT IN TRADITIONAL PONG
                    this.xDir *= 1.05;
                }
            }


            // handle collision with player 2
            //
            // x-pos check:
            // if the next calculated x position is equal to the second players x-position minus its width ..
            if (nextX > player2.x - player2.width) {
                // height check:
                //
                // if the ball's y-position is above the players position (bottom-left-anchor-point)
                // and if the y-position below the players position width its height added ...
                if (nextY > player2.y - this.radius
                    && nextY < player2.y + player2.height) {
                    // set the x-direction vector to the 'regular' direction (i.e. make it bounce from the pad)
                    this.xDir = -Math.abs(this.xDir);
                    Utils.playSound_PlayerCollision();

                    // with every tick, we speed up the ball a litte ... NOT IN TRADITIONAL PONG
                    this.yDir *= 1.05;

                }
            }

            // add the direction vector to the balls position, so it'd glide through the canvas-space
            this.x += this.xDir;
            this.y += this.yDir;
        }

        /* handle the rendering of the ball */
        // setup the fillStyle which has been passed by the constructor
        this.context.fillStyle = this.fillStyle;
        // draw a circle on the x and y position of the ball, using the radius, etc.
        this.context.fillRect(this.x, this.y, this.radius, this.radius);
        // this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);

        // if the user decides to toggle the mouse-control of the first player...
        if(Utils.option_followPlayer1){
            // sync the first players y-coordinate with the y-coordinate of the ball
            player1.y = this.y - (player1.height / 2);
        }
        if(Utils.option_followPlayer2){
            // same, but for the second player
            player2.y = this.y - (player2.height / 2);
        }

        // draw the distance between the two paddles and the balls, using a simple styled path
        if(Utils.option_debugShowDistance){
            // for the first player
            context.beginPath();
            context.moveTo(this.x , this.y );
            context.lineTo(this.player1.x + this.player1.width, this.player1.y + (this.player1.height / 2));
            context.lineWidth = 4;
            context.strokeStyle = '#0000ff';
            context.stroke();

            // for the second player
            context.beginPath();
            context.moveTo(this.x , this.y );
            context.lineTo(this.player2.x, this.player2.y + (this.player2.height / 2));
            context.lineWidth = 4;
            context.strokeStyle = '#00ff00';
            context.stroke();
        }

        // draw the direction vector of the ball, using another simple styled path
        if(Utils.option_debugShowDirection){
            context.beginPath();
            context.moveTo(this.x + (this.radius / 2), this.y + (this.radius / 2));
            context.lineTo(this.x + this.xDir * 5, this.y + this.yDir * 5);
            context.lineWidth = 4;
            context.strokeStyle = '#ff0000';
            context.stroke();
        }
    }


    resetPosition(){
        // center the ball
        this.x = (this.context.canvas.width / 2) - (this.radius / 2);
         // this.y = (this.context.canvas.height / 2) - (this.radius / 2);
        this.y    = Utils.getRndInteger(10, this.context.canvas.height - 10);
    }

    resetDirection(){
        // set random direction
        this.xDir = Utils.getRndInteger(-1,1) === 0 ? -10 : 10;
        this.yDir = Utils.getRndInteger(-1,1)=== 0 ? -10 : 10;
    }

    // reset the position of the ball and the player
    resetRound(){
        this.player1.resetPosition(true);
        this.player2.resetPosition(false);

        this.resetPosition();
        this.xDir = 0;
        this.yDir = 0;

        // calculate a new random direction and wait for one second before calculating new ball positions again
        // so the players got time to move their eyes to the center of the game again.
        window.setTimeout(this.resetDirection.bind(this), 1000);
    }


}

