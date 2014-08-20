(function() {
    var game = new Phaser.Game(800, 480, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update });

    function preload () {
        game.load.image('ground', 'assets/img/ground.gif');
        game.load.spritesheet('man', 'assets/img/man.gif', 26, 62, 4);
    }

    function create () {

        this.MAX_SPEED = 250;
        this.ACCELERATION = 600;
        this.DRAG = 1800;
        this.GRAVITY = 980;
        this.JUMP_SPEED = -400;

        this.game.stage.backgroundColor = 0x4488cc;

        this.ground = this.game.add.group();
        for(var x = 0; x < this.game.width; x += 32) {

            var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
            this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
            groundBlock.body.immovable = true;
            groundBlock.body.allowGravity = false;
            this.ground.add(groundBlock);
        }

        this.player = this.game.add.sprite(this.game.width/2, this.game.height - 100, 'man');
        this.player.anchor.setTo(0.5, 1);
        this.player.animations.add('walk',[1,2,3]);

        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;


        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);


        this.player.body.collideWorldBounds = true;


        this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10);


        this.player.body.drag.setTo(this.DRAG, 0);


        game.physics.arcade.gravity.y = this.GRAVITY;

        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN
        ]);

    }

    function update () {

        this.game.physics.arcade.collide(this.player, this.ground);

        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.player.body.acceleration.x = -this.ACCELERATION;
            this.player.play('walk', 5, true);
            this.player.scale.x = -1;
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.player.body.acceleration.x = this.ACCELERATION;
            this.player.play('walk', 5, true);
            this.player.scale.x = 1;
        } else {
            this.player.body.acceleration.x = 0;
            this.player.frame = 0;
        }


        var onTheGround = this.player.body.touching.down;

        if (onTheGround && this.input.keyboard.justPressed(Phaser.Keyboard.UP)) {

            this.player.body.velocity.y = this.JUMP_SPEED;
        }

    }
})();
