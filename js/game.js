var player;
var box;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var music;
var background;
var bird;
var sound;
var state;
var speed = 0.7;
var ground;

class Game extends Phaser.Scene
{
    constructor ()
    {
        super('background');
        this.player = 0;
        this.bird = 0;
        this.box = 0;
    }

    preload ()
    {
        loading(this, 'SKOAD GAME');
        this.player = new Player(this, 100, 100);
        this.bird = new Bird(this, 100, 100);
        this.box = new Box(this, 100, 100);

        this.player.preload();
        this.bird.preload();
        this.box.preload();

        this.load.image('background', 'assets/mont_saint_michel.png');
        this.load.image('ground', 'assets/ground2.png');
        this.load.spritesheet('state', 'assets/state.png', { frameWidth: 50, frameHeight: 50 });
        this.load.spritesheet('sound', 'assets/sound.png', { frameWidth: 50, frameHeight: 50 });
        this.load.spritesheet('box', 'assets/box.png', { frameWidth: 65, frameHeight: 62 });
        this.load.audio('eye_music', 'assets/skoad_music.mp3');
    }

    birdCollisionCallback(obj1, obj2)
    {
        this.physics.moveTo(obj1, 650, 100, 200);
    }

    create ()
    {
        music = this.sound.add('eye_music');
        music.play({loop: true});

        /**************/
        /* BACKGROUND */
        /**************/
        background = this.add.image(0, 0, 'background');
        background.setOrigin(0, 0);
        background.setDisplaySize(config.width, config.height-20);

        /*********/
        /* SOUND */
        /*********/
        sound = this.add.sprite(config.width-50, 25, 'sound');
        sound.setInteractive();
        sound.on('pointerdown', function () {
            if (music.isPlaying) {
                music.pause();
                sound.setTexture('sound', 1);
            } else {
                music.resume();
                sound.setTexture('sound', 0);
            }
        });

        /*********/
        /* PAUSE */
        /*********/
        state = this.add.sprite(config.width-100, 25, 'state').setInteractive();
        state.on('pointerdown', function () {
            if (music.isPlaying) {
                music.pause();
            } else {
                music.resume();
            }
            this.scene.scene.pause();
            this.scene.scene.launch('demo');
        });

        /**********/
        /* GROUND */
        /**********/
        ground = this.add.tileSprite(config.width/2, config.height, 0, 0, 'ground');
        this.physics.add.existing(ground, false);
        ground.body.setCollideWorldBounds(true);
        ground.body.setSize(ground.width, ground.height-13);
        ground.body.setOffset(0, 13);

        /*******/
        /* BOX */
        /*******/
        this.player.create();
        this.bird.create();
        this.box.create();

        cursors = this.input.keyboard.createCursorKeys();
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

        /*************/
        /* COLLISION */
        /*************/
        this.physics.add.collider(this.player.sprite, ground);
        this.physics.add.collider(this.box.sprite, ground);
        //this.physics.add.collider(player, box);
        //this.physics.add.collider(bird, ground);
        //this.physics.add.collider(this.bird.sprite, this.player.sprite, this.birdCollisionCallback(), this.processCallback(), this);
    }

    update ()
    {
        if (gameOver)
        {
            return;
        }

        this.physics.collide(this.bird.sprite, this.player.sprite, this.birdCollisionCallback, this.processCallback, this);

        if ((this.bird.sprite.body.x <= this.bird.initX + 50 && this.bird.sprite.body.x >= this.bird.initX - 50) && 
            (this.bird.sprite.body.y <= this.bird.initY + 50 && this.bird.sprite.body.y >= this.bird.initY - 50)) {
            this.bird.sprite.body.setVelocity(0);
        }

        if (Phaser.Math.Between(0, 800) == 2) {
            this.physics.moveToObject(this.bird.sprite, this.player.sprite, 200);
        }

        ground.tilePositionX += speed;
        this.box.sprite.x += -speed;

        if (cursors.up.isDown && this.player.sprite.body.touching.down)
        {
            this.player.sprite.setVelocityY(-330);
        }

        if (this.box.sprite.x + this.box.sprite.width <= -1) {
            this.box.sprite.x = config.width - this.box.sprite.width;
            this.box.sprite.y = 300;
        }

    }
}
