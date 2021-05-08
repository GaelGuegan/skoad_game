class Player extends Phaser.GameObjects.Sprite
{
    static NORMAL = 0;

    constructor (scene, x, y)
    {
        super(scene, x, y);
        this.scene = scene;
        this.sprite = 0;
        this.life = 3;
        this.images = [];
    }

    preload ()
    {
        this.scene.load.spritesheet('dude', 'assets/skoad_man.png', { frameWidth: 28, frameHeight: 50 });
        this.scene.load.image('life', 'assets/life.png');
    }

    playerBoxCollisionCallback(box, player)
    {
        player.life = player.life - 1;
    }

    create()
    {
        this.sprite = this.scene.physics.add.sprite(100, 100, 'dude');
        this.sprite.setState(this.NORMAL);
        this.sprite.setScale(2);
        this.sprite.setBounce(0);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.setImmovable(true);

        for (var i = 0; i < this.life; i++) {
            this.images[i] = this.scene.add.image(220 + i*30, 17, 'life');
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
            //frames: this.scene.anims.generateFrameNumbers('dude', { start: 7, end: 11 }),
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 9, end: 13 }),
            frameRate: 8,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'jump_right',
            //frames: this.scene.anims.generateFrameNumbers('dude', { start: 9, end: 13 }),
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

        /*if (cursors.up.isDown && player.body.touching.down)
        {
            this.setVelocityY(-330);
        }*/
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
