var cursors;
var scoreText;
var background;
var bird;
var sound;
var state;
var speed = 0.7;

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
    }

    preload ()
    {
        loading(this, 'SKOAD GAME');
        this.player = new Player(this, 100, 100);
        this.bird = new Bird(this, 100, 100);
        this.box = new Box(this, 100, 100);
        this.ground = new Ground(this, 10, 10); 
        this.music = new Music(this, 10, 10); 

        this.player.preload();
        this.bird.preload();
        this.box.preload();
        this.ground.preload();
        this.music.preload();

        this.load.image('background', 'assets/mont_saint_michel.png');
        this.load.spritesheet('state', 'assets/state.png', { frameWidth: 50, frameHeight: 50 });
        //this.load.spritesheet('sound', 'assets/sound.png', { frameWidth: 50, frameHeight: 50 });
        //this.load.audio('eye_music', 'assets/skoad_music.mp3');
    }

    birdPlayerCollisionCallback(_bird, player)
    {
        this.physics.moveTo(_bird, 650, 100, 200);
        if (this.player.life > 0) {
            this.player.images[this.player.life-1].destroy();
            this.player.life = this.player.life - 1;
        }
    }
    boxPlayerCollisionCallback(_box, _player)
    {
        if (this.player.life > 0) {
            this.player.images[this.player.life-1].destroy();
            this.player.life = this.player.life - 1;
        }
        this.box.sprite.x = config.width - this.box.sprite.width;
        this.box.sprite.y = 300;
    }

    create ()
    {
        /**************/
        /* BACKGROUND */
        /**************/
        background = this.add.image(0, 0, 'background');
        background.setOrigin(0, 0);
        background.setDisplaySize(config.width, config.height-20);


        /********************/
        /* OBJECTS CREATION */
        /********************/
        this.ground.create();
        this.player.create();
        this.bird.create();
        this.box.create();
        this.music.create();

        /*********/
        /* PAUSE */
        /*********/
        state = this.add.sprite(config.width-100, 25, 'state').setInteractive();
        state.setFrame(1);
        state.on('pointerdown', function () {
            this.scene.music.update();
            state.setFrame(0);
            this.scene.scene.pause();
            this.scene.scene.launch('pause');
        });
        this.events.on('resume', function (a) {
            a.scene.music.update();
            state.setFrame(1);
        });

        cursors = this.input.keyboard.createCursorKeys();
        scoreText = this.add.text(16, 3, 'Score: 0', { fontSize: '30px', fill: '#000' });

        /*************/
        /* COLLISION */
        /*************/
        this.physics.add.collider(this.player.sprite, this.ground.sprite);
        this.physics.add.collider(this.box.sprite, this.ground.sprite);
    }

    update ()
    {
        if (this.player.life == 0) {
            this.music.music.pause();
            this.scene.pause();
            this.scene.launch('gameover');
        }

        this.physics.collide(this.box.sprite, this.player.sprite, this.boxPlayerCollisionCallback, 0, this);
        this.physics.collide(this.bird.sprite, this.player.sprite, this.birdPlayerCollisionCallback, 0, this);
        //this.physics.collide(this.bird.sprite, this.player.sprite, this.bird.playerCollisionCallback, 0, this);
        this.bird.update();

        if (Phaser.Math.Between(0, 500/*800*/) == 1 && this.bird.sprite.body.velocity.equals(Phaser.Math.Vector2.ZERO)) {
            this.physics.moveToObject(this.bird.sprite, this.player.sprite, 200);
        }

        this.ground.sprite.tilePositionX += speed;
        this.box.sprite.x += -speed;

        if (cursors.up.isDown && this.player.sprite.body.touching.down) {
            this.player.sprite.setVelocityY(-330);
        }

        if (this.box.sprite.x + this.box.sprite.width <= -1) {
            this.box.sprite.x = config.width - this.box.sprite.width;
            this.box.sprite.y = 300;
        }

    }
}
