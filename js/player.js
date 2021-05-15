class Player extends Phaser.GameObjects.Sprite
{
    static NORMAL = 0;

    constructor (scene, x, y)
    {
        super(scene, x, y);
        this.scene = scene;
        this.sprite = 0;
        this.life = 3;
        this.lifeImages = [];
        this.hurtSound = 0;
    }

    preload ()
    {
        this.scene.load.spritesheet('dude', 'assets/skoad_man.png', { frameWidth: 28, frameHeight: 50 });
        this.scene.load.image('life', 'assets/life.png');
        this.scene.load.audio('hurt', 'assets/hurt.wav');
    }

    playerBoxCollisionCallback(box, player)
    {
        player.life = player.life - 1;
    }

    clearPlayerTint()
    {
        this.sprite.clearTint();
    }

    removeLife()
    {
        if (this.life > 0) {
            this.hurtSound.play();
            this.lifeImages[this.life - 1].destroy();
            this.life = this.life - 1;
            this.sprite.setTint(0xff0000);
            this.scene.time.delayedCall(800, this.clearPlayerTint, [], this);
        }
    }

    create()
    {
        this.sprite = this.scene.physics.add.sprite(100, 100, 'dude');
        this.hurtSound = this.scene.sound.add('hurt');
        //this.sprite.setState(this.NORMAL);
        this.sprite.setScale(2);
        this.sprite.setBounce(0);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.setImmovable(true);

        for (var i = 0; i < this.life; i++) {
            this.lifeImages[i] = this.scene.add.image(220 + i*30, 17, 'life');
        }

        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'idle_left',
            frames: [ { key: 'dude', frame: 5 } ],
        });
        this.scene.anims.create({
            key: 'idle_right',
            frames: [ { key: 'dude', frame: 6 } ],
        });
        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 9, end: 13 }),
            frameRate: 8,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'jump_right',
            frames: [ { key: 'dude', frame: 6 } ],
        });
        this.scene.anims.create({
            key: 'jump_up',
            frames: [ { key: 'dude', frame: 7 } ],
        });

        this.sprite.anims.play('right', true);
    }

    update()
    {
        if (!this.sprite.body.touching.down) {
            if (this.sprite.body.velocity.y < 200 && this.sprite.body.velocity.y > -100) {
                this.sprite.anims.play('jump_up', true);
            } else {
                this.sprite.anims.play('jump_right', true);
            }
        } else {
            this.sprite.anims.play('right', true);
        }
    }
}
