# Bomb the Bugs!

Ironhack Module 1 Project.
[Click here to play game!](https://raiden-w.github.io/ironhack-m1-project-bomb-bugs/)

## Description

"Bomb the Bugs!" is a game where the player needs to use mouse click on the canvas to place some wooden logs in proper positions and also rotate them, to colide the droping bombs and change bombs' trajectory, making them target the bugs in limited time. The game has different levels setting, and the difficulty increases during the playing process. The game ends when a player passes all the levels or cannot clean the bugs in time. Player can also choose which level to start.

## MVP (DOM - CANVAS)

- mouse first click to spawn a log on the canvas according to the current mouse position
- after mouse first click, the angle of logs is adjusted according to the current mouse position
- mouse second click to place a log and makes it checking collision with bombs
- simple physical simulation of bombs like gravity, acceleration and velocity
- when detecting collision between bombs and logs, apply a bouncing force to change the acceleration and velocity of bombs accroding to the collided log's angle
- check collision between bombs and bugs
- clean bugs and bombs array when booms happen
- check the amount of left bugs in each level and check if the play wins the level
- check if the current level is the last level and if the play wins the whole game
- make a chasing-back function to cancel the lastest log the play put on the canvas
- use DOM manipulation to create buttons corresponding to all the existing logs
- only make the last log available to remove through the HTML button
- if the lastest log is removed, restore the lastest bug the play just killed, to make the game fair
- side bar to display health bar of bugs, time left of this level and current level number
- automatic restart
- different levels setting

## Backlog

- random level setting generation function
- infinite mode to bomb bugs
- display the accumulated amount of killed bugs
- responsive canvas

## Data Structure

# index.js

- getMousePos () {}
- startGame () {}
- animate () {}
- resetLevel () {}
- cleanAllAssets () {}
- removeEleInBlocks () {}
- onlyLastBlockRemovable () {}
- drawCurrLevelCanvas () {}
- finalWinText () {}
- gameOverText () {}
- drawInfoBar () {}

# class.js

- Block () {
  this.initMouseX;
  this.initMouseY;
  this.line;
  this.rotateAngle;
  this.readyToCheck;
  this.removeThis;
  this.node;
  }
- drawLine () {}
- updateLine () {}
- doneLine () {}
- checkCollision () {}
- addNode () {}
- cleanNode() {}

- Candy () {
  this.force;
  this.acc;
  this.vel;
  this.gravity;
  this.radius;
  this.x;
  this.pos;
  this.isCollide;
  this.hasPlayedSound;
  this.angle;
  }
- drawCandy () {}
- updatePos () {}
- reset () {}
- collide () {}

- Target () {
  this.x;
  this.y;
  this.radius;
  this.isHit;
  this.isBoomming;
  this.t;
  this.bugImg;
  }
- drawTargetInAni () {}
- checkHit () {}
- drawBoom() {}

## States y States Transitions

Definition of the different states and their transition (transition functions)

- Splash page
- Game
- Game final win
- Game over

## Links

### Git

URls for the project repo and deploy
[Link Repo](https://github.com/Raiden-W/ironhack-m1-project-bomb-bugs)
[Link Deploy](https://raiden-w.github.io/ironhack-m1-project-bomb-bugs/)

### Slides

URls for the project presentation (slides)
[Link Slides.com](https://docs.google.com/presentation/d/1xmSZOpzc5svv6TI-iY9i7z6ar9isSHLBf5Lq7fNBef4/edit?usp=sharing)
