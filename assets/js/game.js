(function() {
    var game = new Phaser.Game(800, 480, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update });

    function preload () {
        game.load.image('ground', 'assets/img/ground.gif');
        game.load.image('man', 'assets/img/man.gif');
    }

    function create () {
        // Define movement constants
        this.MAX_SPEED = 250; // pixels/second
        this.ACCELERATION = 600; // pixels/second/second
        this.DRAG = 800; // pixels/second
        this.GRAVITY = 980; // pixels/second/second
        this.JUMP_SPEED = -400; // pixels/second (negative y is up)

        this.game.stage.backgroundColor = 0x4488cc;

        this.ground = this.game.add.group();
        for(var x = 0; x < this.game.width; x += 32) {
            // Add the ground blocks, enable physics on each, make them immovable
            var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
            this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
            groundBlock.body.immovable = true;
            groundBlock.body.allowGravity = false;
            this.ground.add(groundBlock);
        }

        this.player = this.game.add.sprite(this.game.width/2, this.game.height - 100, 'man');
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;

        // Enable physics on the player
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

        // Make player collide with world boundaries so he doesn't leave the stage
        this.player.body.collideWorldBounds = true;

        // Set player minimum and maximum movement speed
        this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10); // x, y

        // Add drag to the player that slows them down when they are not accelerating
        this.player.body.drag.setTo(this.DRAG, 0); // x, y

        // Since we're jumping we need gravity
        game.physics.arcade.gravity.y = this.GRAVITY;

        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN
        ]);

    }

    function update () {
        // Collide the player with the ground
        this.game.physics.arcade.collide(this.player, this.ground);

        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            // If the LEFT key is down, set the player velocity to move left
            this.player.body.acceleration.x = -this.ACCELERATION;
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            // If the RIGHT key is down, set the player velocity to move right
            this.player.body.acceleration.x = this.ACCELERATION;
        } else {
            this.player.body.acceleration.x = 0;
        }

        // Set a variable that is true when the player is touching the ground
        var onTheGround = this.player.body.touching.down;

        if (onTheGround && this.input.keyboard.justPressed(Phaser.Keyboard.UP)) {
            // Jump when the player is touching the ground and the up arrow is pressed
            this.player.body.velocity.y = this.JUMP_SPEED;
        }

    }
})();
