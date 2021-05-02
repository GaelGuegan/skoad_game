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
        this.scene.load.spritesheet('bird', 'assets/bird.png', { frameWidth: 39, frameHeight: 28 });
    }

    create ()
    {
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

    update ()
    {

        /*if (cursors.up.isDown && player.body.touching.down)
        {
            this.setVelocityY(-330);
        }*/
    }
}

class Box extends Phaser.GameObjects.Sprite
{
    static NORMAL = 0;

    constructor (scene, x, y)
    {
        super(scene, x, y);
        this.scene = scene;
        this.sprite = 0;
    }

    preload ()
    {
        this.scene.load.spritesheet('bird', 'assets/box.png', { frameWidth: 39, frameHeight: 28 });
    }

    create ()
    {
        this.sprite = this.scene.physics.add.sprite(750, 100, 'box');
        this.sprite.setScale(1.5);
        this.sprite.body.setSize(this.sprite.width, this.sprite.height);
        this.sprite.body.setOffset(0, -5);
        this.scene.anims.create({
            key: 'box',
            frames: this.scene.anims.generateFrameNumbers('box', { start: 0, end: 10 }),
            frameRate: 10,
            repeat: -1
        });
        this.sprite.anims.play('box', true);
    }

    update ()
    {

        /*if (cursors.up.isDown && player.body.touching.down)
        {
            this.setVelocityY(-330);
        }*/
    }
}