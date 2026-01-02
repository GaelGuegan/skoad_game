class Bird extends Phaser.GameObjects.Sprite
{
    static NORMAL = 0;
    static ATTACKING = 1;
    static SHITTING = 2;

    constructor (scene, x, y)
    {
        super(scene, x, y);
        this.scene = scene;
        this.sprite = 0;
        this.initX = 650;
        this.initY = 100;
        this.shit = 0;
        this.state = Bird.NORMAL;
        this.attackFreq = 800;
        this.shitFreq = 500;
    }

    preload ()
    {
        this.scene.load.spritesheet('bird', 'assets/bird.png', { frameWidth: 25, frameHeight: 25 });
        this.scene.load.spritesheet('shit', 'assets/shit.png', { frameWidth: 5, frameHeight: 10 });
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
        if (Phaser.Math.Between(0, this.attackFreq) == 1 && this.state == Bird.NORMAL) {
            this.scene.physics.moveToObject(this.sprite, player, 200);
            this.state = Bird.ATTACKING;
        }
    }

    shits(player)
    {
        if (Phaser.Math.Between(0, this.shitFreq) == 1 && this.state == Bird.NORMAL) {
            this.scene.physics.moveTo(this.sprite, player.x, player.y - 200, 200);
            this.state = Bird.SHITTING;
        }

        if (this.state == Bird.SHITTING) {
            if (this.sprite.body.x <= player.body.x + 50) {
                this.shit = this.scene.physics.add.sprite(this.sprite.body.x, this.sprite.body.y, 'shit');
                this.shit.setScale(3);
                this.state = Bird.NORMAL;
            }
        }
    }

    playerCollisionCallback(_bird, _player)
    {
        //this.scene.physics.moveTo(this.sprite, this.initX, this.initY, 200);
        //this.scene.physics.moveTo(this.bird.sprite, this.initX, this.initY, 200);
    }

    update ()
    {
        /* BIRD STAYING ON SPOT */
        if ((this.sprite.body.x <= this.initX + 50 && this.sprite.body.x >= this.initX - 50) && 
            (this.sprite.body.y <= this.initY + 50 && this.sprite.body.y >= this.initY - 50) &&
            !this.sprite.body.velocity.equals(Phaser.Math.Vector2.ZERO) &&
            this.sprite.body.velocity.x > 0){
            this.sprite.body.setVelocity(0);
            this.state = Bird.NORMAL;
        }

        /* BIRD GOING BACK */
        if (this.sprite.body.checkWorldBounds()) {
            //this.scene.physics.moveTo(this.sprite, this.initX, this.initY, 200);
            this.sprite.x = this.initX;
            this.sprite.y = this.initY;
            this.state = Bird.NORMAL;
        }
    }
}

class Box extends Phaser.GameObjects.Sprite
{
    static NORMAL = 0;
    static FLYING = 1;
 
    constructor (scene, x, y)
    {
        super(scene, x, y);
        this.scene = scene;
        this.sprite = 0;
        this.state = Box.NORMAL;
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
        this.scene.anims.create({
            key: 'box',
            frames: this.scene.anims.generateFrameNumbers('box', { start: 0, end: 3 }),
            frameRate: 2,
            repeat: -1
        });
        this.sprite.anims.play('box', true);
    }

    update()
    {

        if (this.state == Box.NORMAL) {
            this.sprite.x += - this.scene.speed;
        }

        if (this.state == Box.FLYING && this.sprite.y > this.scene.ground.sprite.y-50) {
            this.state = Box.NORMAL;
        }

        if (this.sprite.x + this.sprite.width <= -1) {
            this.scene.score = this.scene.score + 1;
            this.scene.scoreText.setText('Score: ' + this.scene.score);
            this.sprite.x = this.scene.cameras.main.width - this.sprite.width;
            this.sprite.y = 300;
            this.sprite.body.setVelocity(0, 0);
        }

        if (this.sprite.x > this.scene.cameras.main.width + 50) {
            this.sprite.x = this.scene.cameras.main.width - this.sprite.width;
            this.sprite.y = 300;
            this.state = Box.NORMAL;
            this.sprite.body.setVelocity(0, 0);
        }
    }
}

class Mob extends Phaser.GameObjects.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y);
        this.scene = scene;
        this.sprite = 0;
        this.freq = 600;
    }

    preload ()
    {
        this.scene.load.spritesheet('mob', 'assets/mob.png', { frameWidth: 39, frameHeight: 24 });
    }

    create ()
    {
        this.sprite = this.scene.physics.add.sprite(this.scene.cameras.main.width - 50, this.scene.cameras.main.height - 150, 'mob');
        this.sprite.setScale(3);
        this.scene.physics.add.collider(this.sprite, this.scene.ground.sprite);
    }

    update ()
    {
        if (Phaser.Math.Between(0, this.freq) == 1 && this.scene.player.state != 1 && this.sprite == 0) {
            this.create();
        }

        if( this.sprite != 0) {
            this.sprite.body.x += - this.scene.speed;
        }

    }
}

class Slip extends Phaser.GameObjects.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y);
        this.scene = scene;
        this.sprite = 0;
    }

    preload ()
    {
        this.scene.load.spritesheet('slip', 'assets/slip.png', { frameWidth: 133, frameHeight: 261 });
    }

    create ()
    {
        this.sprite = this.scene.physics.add.sprite(this.scene.cameras.main.width - 50, this.scene.cameras.main.height - 150, 'slip');
        this.sprite.setScale(0.3);
        this.scene.physics.add.collider(this.sprite, this.scene.ground.sprite);
    }

    update ()
    {
        if (Phaser.Math.Between(0, this.freq) == 1 && this.scene.player.state != 1 && this.sprite == 0) {
            this.create();
        }

        if( this.sprite != 0) {
            this.sprite.body.x += - this.scene.speed;
        }

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
        this.sprite = this.scene.add.tileSprite(this.scene.cameras.main.width/2, this.scene.cameras.main.height, 0, 0, 'ground');
        this.scene.physics.add.existing(this.sprite, false);
        this.sprite.body.setCollideWorldBounds(true);
        this.sprite.body.setSize(this.sprite.width, this.sprite.height-13);
        this.sprite.body.setOffset(0, 13);
    }

    update()
    {
        this.sprite.tilePositionX += this.scene.speed;
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

        this.sprite = this.scene.add.sprite(this.scene.cameras.main.width-50, 25, 'sound');
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
        this.sprite = this.scene.add.sprite(this.scene.cameras.main.width-100, 25, 'state').setInteractive();
        this.sprite.setFrame(1);
        this.sprite.on('pointerdown', function () {
            this.scene.music.update();
            this.setFrame(0);
            this.scene.scene.pause();
            this.scene.scene.launch('pause');
        });
    }
}
