var cursors;
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
        this.score = 0;
        this.speed = 3;
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

        this.player.preload();
        this.bird.preload();
        this.box.preload();
        this.ground.preload();
        this.music.preload();
        this.state.preload();

        this.load.image('background', 'assets/mont_saint_michel.png');
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
        this.state.create();

        this.events.on('resume', function (a) {
            a.scene.music.update();
            a.scene.state.sprite.setFrame(1);
        });

        cursors = this.input.keyboard.createCursorKeys();
        this.score = this.add.text(16, 3, 'Score: 0', { fontSize: '30px', fill: '#000' });

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
        this.bird.attack(this.player.sprite);

        this.ground.sprite.tilePositionX += this.speed;
        this.box.sprite.x += - this.speed;

        if (cursors.up.isDown && this.player.sprite.body.touching.down) {
            this.player.sprite.setVelocityY(-500);
        }
        if (!this.player.sprite.body.touching.down) {
            this.player.sprite.anims.play('jump_right', true);
        } else {
            this.player.sprite.anims.play('right', true);
        }

        if (this.box.sprite.x + this.box.sprite.width <= -1) {
            this.box.sprite.x = config.width - this.box.sprite.width;
            this.box.sprite.y = 300;
        }

    }
}
