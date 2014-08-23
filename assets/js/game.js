(function() {
    var game = new Phaser.Game(800, 480, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update });

    function preload () {
        game.load.image('ground', 'assets/img/ground.gif');
        game.load.spritesheet('player', 'assets/img/player.gif', 64, 64, 4);
    }

    function create () {


        this.MAX_SPEED = 350;
        this.ACCELERATION = 1000;
        this.DRAG = 180;
        this.GRAVITY = 980;
        this.JUMP_SPEED = -400;
        this.MAX_JUMPS = 2;

        this.currentJumps = 0;

        this.game.stage.backgroundColor = 0x4488cc;
        this.game.world.setBounds(0, 0, 8000, 480);

        this.ground = this.game.add.group();
        for(var x = 0; x < this.game.world.width; x += 256) {

            var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
            this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
            groundBlock.body.immovable = true;
            groundBlock.body.allowGravity = false;
            this.ground.add(groundBlock);
        }

        this.player = this.game.add.sprite(0, this.game.height - 100, 'player');
        this.player.anchor.setTo(0.5, 1);

        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        // this.player.body.collideWorldBounds = true;


        this.game.camera.y = this.game.height - 100;

        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);


        this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10);


        this.player.body.drag.setTo(this.DRAG, 0);


        game.physics.arcade.gravity.y = this.GRAVITY;

        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.SPACEBAR
        ]);


        var up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        up.onDown.add(function(up) {

            if (this.currentJumps < this.MAX_JUMPS) {
                this.player.body.velocity.y = this.JUMP_SPEED;
                this.currentJumps++;
            }

        }, this);


    }

    function update () {
        this.game.camera.setPosition(this.player.body.x - this.game.width/2, this.player.body.y);
        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            game.physics.arcade.gravity.y = -Math.abs(this.GRAVITY);
        }
        else {
            game.physics.arcade.gravity.y = Math.abs(this.GRAVITY);

        }

        this.game.physics.arcade.collide(this.player, this.ground);

        var onTheGround = this.player.body.touching.down;

        if (onTheGround) {
            this.currentJumps = 0;
            this.player.body.drag.setTo(this.DRAG*10, 0);
        }
        else this.player.body.drag.setTo(this.DRAG, 0);

        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.player.body.acceleration.x = -this.ACCELERATION;
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.player.body.acceleration.x = this.ACCELERATION;
        } else {
            this.player.body.acceleration.x = 0;
        }


    }
})();
