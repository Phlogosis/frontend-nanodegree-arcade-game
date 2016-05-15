// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.gridX = 101;
    this.gridY = 83;
    this.posY = Math.floor(Math.random() * 3) + 1;
    this.startX = this.gridX * -1;
    this.startY = this.gridY * 1;
    this.xvelocity = 450;

    this.x = this.startX;
    this.y = this.startY;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.xvelocity * dt) + this.x;
    if (this.x > this.gridX * 5) {
        this.x = this.startX;
        this.posY = Math.floor(Math.random() * 3) + 1;
        this.xvelocity = Math.floor(Math.random() * (650 - 200)) + 200; // Math.floor(Math.random() * (max - min)) + min => random integer
                                                                        // between max and min
    }
    this.y = this.gridY * this.posY;
    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y - 40);
};

//Handle collision
Enemy.prototype.checkCollision = function() {
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    var dx = (this.x - player.x)
    var dy = (this.y - player.y)
    var distance = Math.sqrt(dx * dx + dy * dy)
    if (distance < 83) {player.posX = 2; player.posY = 5;}
    //  radius 1 + radius 2 = diamater 1, if radius 1 = radius 2
    // diameter 1 = sprite width
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.gridX = 101;
    this.gridY = 83;
    this.posX = 2;
    this.posY = 5;
    this.x = this.gridX * this.posX;
    this.y = this.gridY * this.posY;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y - 40);
};

Player.prototype.update = function(dt) {
    this.x = this.gridX * this.posX;
    if (this.posY === 0) {this.posY = 5;} // set posY before updating graphics to avoid shearing
    this.y = this.gridY * this.posY;
    
};

Player.prototype.handleInput = function(keyIn) {
    if (keyIn === 'up' && this.posY > 0) {this.posY -= 1;}
    if (keyIn === 'down' && this.posY < 5) {this.posY += 1;}
    if (keyIn === 'left' && this.posX > 0) {this.posX -= 1;}
    if (keyIn === 'right' && this.posX < 4) {this.posX += 1;}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(), new Enemy(), new Enemy()];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
