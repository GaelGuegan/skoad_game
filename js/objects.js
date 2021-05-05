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

    /*playerCollisionCallback(bird, player)
    {
    	console.log("oiugiug");
    	console.log(this.physics);
        this.physics.moveTo(this.sprite, this.initX, this.initY, 200);
    	console.log("zzzz");
    }*/

    update ()
    {

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
    }
}