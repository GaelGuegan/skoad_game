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
        this.scene.load.spritesheet('dude', 'assets/skoad_man.png', { frameWidth: 32, frameHeight: 50 });
        this.scene.load.image('life', 'assets/life.png');
    }

    playerBoxCollisionCallback(box, player)
    {
        player.life = player.life - 1;
    }

    create ()
    {
        this.sprite = this.scene.physics.add.sprite(100, 100, 'dude');
        this.sprite.setState(this.NORMAL);
        this.sprite.setScale(2);
        this.sprite.setBounce(0.2);
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
            frameRate: 20
        });
        this.scene.anims.create({
            key: 'idle_right',
            frames: [ { key: 'dude', frame: 6 } ],
            frameRate: 20
        });
        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 7, end: 11 }),
            frameRate: 8,
            repeat: -1
        });

        this.sprite.anims.play('right', true);
    }

    update ()
    {

        /*if (cursors.up.isDown && player.body.touching.down)
        {
            this.setVelocityY(-330);
        }*/
    }
}
