"use strict";

/**
 * Author: Vorname Nachname (email@ostfalia.de) - Mat.Nr.
 *
 * This is the Utils-Model of the pong-project.
 *
 * This class acts as a simple holder for static variables/functions in order to control the gameplay
 * (like enabling or disabling the sound, activating pause-mode, etc.)
 */
class Utils {

    constructor(option_ToggleSound, option_followPlayer1, option_followPlayer2, option_ctrlPlayer1, option_ctrlPlayer2, option_debugShowDirectio, option_debugShowDistance, option_togglePause) {
        // ... has sound enabled at the beginning?
        this.option_ToggleSound = option_ToggleSound;

        // ... is the first player controlled by the "computer"?
        this.option_followPlayer1 = option_followPlayer1;

        // ... is the second player controlled by the "computer"?
        this.option_followPlayer2 = option_followPlayer2;

        // ... is the first player controlled by a human (and its mouse)?
        this.option_ctrlPlayer1 = option_ctrlPlayer1;

        // ... is the second player controlled by a human (and its mouse)?
        this.option_ctrlPlayer2 = option_ctrlPlayer2;

        // ... is the direction-vector of the ball shown from the beginning?
        this.option_debugShowDirection = option_debugShowDirectio;

        // ... are the distances between the ball and the paddles visualized from the beginning?
        this.option_debugShowDistance = option_debugShowDistance;

        // ... is the game starting in pause mode?
        this.option_togglePause = option_togglePause;

        if (this.option_ToggleSound) Utils.toggleSound();
        if (this.option_followPlayer1) Utils.toggleFollowP1();
        if (this.option_followPlayer2) Utils.toggleFollowP2();
        if (this.option_ctrlPlayer1) Utils.toggleControlP1();
        if (this.option_ctrlPlayer2) Utils.toggleControlP2();
        if (this.option_debugShowDirection) Utils.toggleDebugShowDirection();
        if (this.option_debugShowDistance) Utils.toggleDebugShowDistance();
        if (this.option_togglePause) Utils.togglePause();
    }

    // Plays the sound "Border Collision" (which is played when the ball collides with a wall)
    static playSound_BorderCollision() {
        if (this.option_ToggleSound) {
            var audio = new Audio('assets/1_BorderCollision.ogg');
            audio.preload = 'auto';
            audio.play();
        }
    }

    // Plays the sound "Player Collision" (which is played when the ball collides with a player)
    static playSound_PlayerCollision() {
        if (this.option_ToggleSound) {
            var audio = new Audio('assets/2_PlayerCollision.ogg');
            audio.preload = 'auto';
            audio.play();
        }
    }

    // Plays the sound "Ball Out" (which is played when the ball passes a players paddle)
    static playSound_BallOut() {
        if (this.option_ToggleSound) {
            var audio = new Audio('assets/3_BallOut.ogg');
            audio.preload = 'auto';
            audio.play();
        }
    }

    // Return a random integer (between min and max)
    static getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // Option - Toggle the sound-output of the game
    static toggleSound() {
        this.option_ToggleSound = !this.option_ToggleSound;
    }

    // Option - Toggle the control-state of this player
    static toggleFollowP1() {
        this.option_followPlayer1 = !this.option_followPlayer1;

        if(this.option_ctrlPlayer1){
            this.option_ctrlPlayer1 = false;
        }
    }

    // Option - Toggle the control-state of this player
    static toggleFollowP2() {
        this.option_followPlayer2 = !this.option_followPlayer2;

        if(this.option_ctrlPlayer1){
            this.option_ctrlPlayer1 = false;
        }
    }

    // Option - Toggle the control-state of this player
    static toggleControlP1() {
        this.option_ctrlPlayer1 = !this.option_ctrlPlayer1;
    }

    // Option - Toggle the control-state of this player
    static toggleControlP2() {
        this.option_ctrlPlayer2 = !this.option_ctrlPlayer2;
    }

    // Option - Toggle if the direction-vector of the ball should be visualized
    static toggleDebugShowDirection() {
        this.option_debugShowDirection = !this.option_debugShowDirection;
    }

    // Option - Toggle if the distance between the paddlings/balls should be visualized
    static toggleDebugShowDistance() {
        this.option_debugShowDistance = !this.option_debugShowDistance;
    }

    // Option - Toggle the pause-mode of the game
    static togglePause() {
        this.option_togglePause = !this.option_togglePause;
    }
}
