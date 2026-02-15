var background;

class Game extends Phaser.Scene
{
    constructor ()
    {
        super('game');
        this.player = 0;
        this.bird = 0;
        this.box = 0;
        this.ground = 0;
        this.music = 0;
        this.state = 0;
        this.scoreText = 0;
        this.score = 0;
        this.speed = 3;
        this.cursors = 0;
        this.mob = 0;
        this.slip = 0;
    }

    preload ()
    {
        loading(this, 'SKOAD GAME');
        this.player = new Player(this, 100, 100);
        this.bird = new Bird(this, 100, 100);
        this.box = new Box(this, 100, 100);
        this.ground = new Ground(this, 10, 10); 
        this.music = new Music(this, 10, 10); 
        this.state = new State(this, 10, 10);
        this.mob = new Mob(this, 10, 10);
        this.slip = new Slip(this, 10, 10);

        this.player.preload();
        this.bird.preload();
        this.box.preload();
        this.ground.preload();
        this.music.preload();
        this.state.preload();
        this.mob.preload();
        this.slip.preload();

        this.load.image('background', 'assets/mont_saint_michel.png');
    }

    birdPlayerCollisionCallback(_bird, _player)
    {
        if (this.player.state == Player.STRIKE) {
            //this.bird.destroy();
            return;
        }
        this.physics.moveTo(_bird, 650, 100, 200);
        this.player.removeLife();
    }

    shitPlayerCollisionCallback(_shit, _player)
    {
        if (this.player.state == Player.STRIKE) {
            this.physics.moveTo(this.bird.shit, 650, 0, 100, 1000, 1000);
            return;
        }
        this.physics.moveTo(this.bird.sprite, this.bird.initX, this.bird.initY, 200);
        this.player.removeLife();
    }

    shitGroundCollisionCallback(_shit, _ground)
    {
        this.bird.shit.destroy();
    }

    boxPlayerCollisionCallback(_box, _player)
    {
        if (this.player.state == Player.MOB) {
            this.box.state = Box.FLYING;
            this.box.sprite.body.setVelocity(520, -720);
        } else {
            this.player.removeLife();
            this.box.sprite.x = this.cameras.main.width - this.box.sprite.width;
            this.box.sprite.y = 300;
        }
    }

    boxBirdCollisionCallback(_box, _bird)
    {
        this.box.state = Box.NORMAL;
    }

    mobPlayerCollisionCallback(_mob, _player)
    {
        this.mob.sprite.destroy();
        this.mob.sprite = 0;
        this.speed = 7;
        this.player.mob();
        this.player.mobTimeout = this.time.delayedCall(6000, this.player.run, [], this.player);
    }

    slipPlayerCollisionCallback(_slip, _player)
    {
        this.slip.sprite.destroy();
        this.slip.sprite = 0;
        this.player.borat();
    }

    create ()
    {
        /**************/
        /* BACKGROUND */
        /**************/
        background = this.add.image(0, 0, 'background');
        background.setOrigin(0, 0);
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height - 20);

        /********************/
        /* OBJECTS CREATION */
        /********************/
        this.ground.create();
        this.player.create();
        this.bird.create();
        this.box.create();
        //this.slip.create();
        this.music.create();
        this.state.create();

        this.events.on('resume', function (a) {
            a.scene.music.update();
            a.scene.state.sprite.setFrame(1);
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.scoreText = this.add.text(16, 3, 'Score: 0', { fontSize: '30px', fill: '#000' });

        /*************/
        /* COLLISION */
        /*************/
        this.physics.add.collider(this.player.sprite, this.ground.sprite);
        this.physics.add.collider(this.box.sprite, this.ground.sprite);
        this.physics.add.collider(this.box.sprite, this.bird.sprite);
    }

    gameover()
    {
        this.music.music.pause();
        this.scene.pause();
        this.scene.launch('gameover');
    }

    update ()
    {
        if (this.player.life == 0) {
            this.gameover();
        }

        this.physics.collide(this.box.sprite, this.player.sprite, this.boxPlayerCollisionCallback, 0, this);
        this.physics.collide(this.bird.sprite, this.player.sprite, this.birdPlayerCollisionCallback, 0, this);
        this.physics.collide(this.bird.shit, this.player.sprite, this.shitPlayerCollisionCallback, 0, this);
        this.physics.collide(this.mob.sprite, this.player.sprite, this.mobPlayerCollisionCallback, 0, this);
        this.physics.collide(this.box.sprite, this.bird.sprite, this.boxBirdCollisionCallback, 0, this);
        this.physics.collide(this.slip.sprite, this.player.sprite, this.slipPlayerCollisionCallback, 0, this);
        this.physics.collide(this.bird.shit, this.ground.sprite, this.shitGroundCollisionCallback, 0, this);
        this.bird.update();
        this.bird.attack(this.player.sprite);
        this.bird.shits(this.player.sprite);

        this.ground.update();
        this.box.update();
        this.slip.update();
        this.player.update();
        this.mob.update();
    }
}
