class Bird extends Phaser.GameObjects.Sprite
{
    static NORMAL = 0;

    constructor (scene, x, y)
    {
        super(scene, x, y);
        this.scene = scene;
        this.sprite = 0;
        this.initX = 650;
        this.initY = 100;
    }

    preload ()
    {
        this.scene.load.spritesheet('bird', 'assets/bird.png', { frameWidth: 25, frameHeight: 25 });
    }

    create ()
    {
        /* CREATING IMAGE */
        this.sprite = this.scene.physics.add.sprite(this.initX, this.initY, 'bird');
        this.sprite.setScale(2);
        this.sprite.body.setAllowGravity(false);
        this.scene.anims.create({
            key: 'bird',
            frames: this.scene.anims.generateFrameNumbers('bird', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.sprite.anims.play('bird', true);
    }

    attack(player)
    {
        if (Phaser.Math.Between(0, 800) == 1 && this.sprite.body.velocity.equals(Phaser.Math.Vector2.ZERO)) {
            this.scene.physics.moveToObject(this.sprite, player, 200);
        }
    }

    playerCollisionCallback(_bird, _player)
    {
        //this.scene.physics.moveTo(this.sprite, this.initX, this.initY, 200);
        this.scene.physics.moveTo(this.bird.sprite, this.initX, this.initY, 200);
    }

    update ()
    {
        /* BIRD STAYING ON SPOT */
        if ((this.sprite.body.x <= this.initX + 50 && this.sprite.body.x >= this.initX - 50) && 
            (this.sprite.body.y <= this.initY + 50 && this.sprite.body.y >= this.initY - 50) &&
            !this.sprite.body.velocity.equals(Phaser.Math.Vector2.ZERO) &&
            this.sprite.body.velocity.x > 0){
            this.sprite.body.setVelocity(0);
        }
    }
}

class Box extends Phaser.GameObjects.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y);
        this.scene = scene;
        this.sprite = 0;
    }

    preload ()
    {
        this.scene.load.spritesheet('box', 'assets/box.png', { frameWidth: 37, frameHeight: 41 });
    }

    create ()
    {
        this.sprite = this.scene.physics.add.sprite(750, 100, 'box');
        this.sprite.setScale(1.5);
        this.sprite.body.setSize(this.sprite.width, this.sprite.height);
        this.sprite.body.setOffset(0, -5);
        this.scene.anims.create({
            key: 'box',
            frames: this.scene.anims.generateFrameNumbers('box', { start: 0, end: 3 }),
            frameRate: 2,
            repeat: -1
        });
        this.sprite.anims.play('box', true);
    }
}

class Ground extends Phaser.GameObjects.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y);
        this.scene = scene;
        this.sprite = 0;
    }

    preload ()
    {
        this.scene.load.image('ground', 'assets/ground2.png');
    }

    create ()
    {
        this.sprite = this.scene.add.tileSprite(this.scene.sys.game.config.width/2, this.scene.sys.game.config.height, 0, 0, 'ground');
        this.scene.physics.add.existing(this.sprite, false);
        this.sprite.body.setCollideWorldBounds(true);
        this.sprite.body.setSize(this.scene.sys.game.config.width, this.sprite.height-13);
        this.sprite.body.setOffset(0, 13);
    }
}

class Music extends Phaser.GameObjects.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y);
        this.scene = scene;
        this.sprite = 0;
        this.music = 0;
    }

    preload ()
    {
        this.scene.load.spritesheet('sound', 'assets/sound.png', { frameWidth: 50, frameHeight: 50 });
        this.scene.load.audio('eye_music', 'assets/skoad_music.mp3');
    }

    create ()
    {
        this.music = this.scene.sound.add('eye_music');
        this.music.play({loop: true});

        this.sprite = this.scene.add.sprite(this.scene.sys.game.config.width-50, 25, 'sound');
        this.sprite.setInteractive();
        this.sprite.on('pointerdown', function (a) {
            this.scene.music.update();
        });
    }

    update ()
    {
        if (this.music.isPlaying) {
            this.music.pause();
            this.sprite.setTexture('sound', 1);
        } else {
            this.music.resume();
            this.sprite.setTexture('sound', 0);
        }
    }
}

class State extends Phaser.GameObjects.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y);
        this.scene = scene;
        this.sprite = 0;
    }

    preload ()
    {
        this.scene.load.spritesheet('state', 'assets/state.png', { frameWidth: 50, frameHeight: 50 });
    }

    create ()
    {
        this.sprite = this.scene.add.sprite(this.scene.sys.game.config.width-100, 25, 'state').setInteractive();
        this.sprite.setFrame(1);
        this.sprite.on('pointerdown', function () {
            this.scene.music.update();
            this.setFrame(0);
            this.scene.scene.pause();
            this.scene.scene.launch('pause');
        });
    }
}