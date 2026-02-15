class Player extends Phaser.GameObjects.Sprite
{
    static RUN = 0;
    static MOB = 1;
    static SQUAT = 2;
    static BORAT = 3;
    static STRIKE = 4;

    constructor (scene, x, y)
    {
        super(scene, x, y);
        this.scene = scene;
        this.sprite = 0;
        this.life = 3;
        this.lifeImages = [];
        this.hurtSound = 0;
        this.state = Player.RUN;
        this.mobTimeout = 0;
        this.currentScale = 2;
        this.boratTimeout = 0;
        this.strikeTimeout = 0;
        this.strikeSound = 0;
        this.mobTimeout = 0;
    }

    preload ()
    {
        this.scene.load.spritesheet('dude', 'assets/skoad_man.png', { frameWidth: 28, frameHeight: 50 });
        this.scene.load.spritesheet('dude_squat', 'assets/skoad_man_squat.png', { frameWidth: 20, frameHeight: 33 });
        this.scene.load.spritesheet('dude_mob', 'assets/skoad_man_mob.png', { frameWidth: 39, frameHeight: 38 });
        this.scene.load.spritesheet('dude_borat', 'assets/borat.png', { frameWidth: 82, frameHeight: 152 });
        this.scene.load.spritesheet('dude_strike', 'assets/strike.png', { frameWidth: 45, frameHeight: 50 });
        this.scene.load.image('life', 'assets/life.png');
        this.scene.load.audio('hurt', 'assets/hurt.wav');
        this.scene.load.audio('strike_s', 'assets/strike.wav');
    }

    createAnimations()
    {
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
        this.scene.anims.create({
            key: 'jump_borat',
            frames: [ { key: 'dude_borat', frame: 3 } ],
        });
        this.scene.anims.create({
            key: 'squat',
            frames: [ { key: 'dude_squat'} ],
        });
        this.scene.anims.create({
            key: 'mob',
            frames: this.scene.anims.generateFrameNumbers('dude_mob', { start: 0, end: 7 }),
            frameRate: 8,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'borat',
            frames: this.scene.anims.generateFrameNumbers('dude_borat', { start: 4, end: 7}),
            frameRate: 8,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'strike',
            frames: this.scene.anims.generateFrameNumbers('dude_strike', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1,
        });
    }

    playerBoxCollisionCallback(box, player)
    {
        player.life = player.life - 1;
    }

    clearPlayerTint()
    {
        this.sprite.clearTint();
    }

    setScale(newScale, bodyWidth = 0, bodyHeight = 0)
    {
        if (this.currentScale !== newScale) {
            this.sprite.setScale(newScale);
            this.currentScale = newScale;
        }
        if (bodyWidth === 0 && bodyHeight === 0) {
            this.sprite.body.setSize(this.sprite.displayWidth, this.sprite.displayHeight);
        }
        if (this.sprite.body.width !== bodyWidth || this.sprite.body.height !== bodyHeight) {
            this.sprite.body.setSize(bodyWidth, bodyHeight);
        }  
    }

    removeLife()
    {
        if (this.life > 0 && this.state != Player.MOB ) {
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
        this.strikeSound = this.scene.sound.add('strike_s');
        this.sprite.setState(this.NORMAL);
        this.sprite.setScale(2);
        this.sprite.setBounce(0);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.setImmovable(true);

        for (var i = 0; i < this.life; i++) {
            this.lifeImages[i] = this.scene.add.image(220 + i*30, 17, 'life');
        }

        this.scene.input.on('pointerdown', function () {
            if (this.scene.player.state == Player.RUN) {
                this.scene.player.jump();
            }
        });
        this.scene.input.keyboard.on('keyup-DOWN', function () {
            this.scene.player.sprite.y = this.scene.player.sprite.y - 50;
            this.state = Player.RUN;
        });
        this.scene.input.keyboard.on('keyup-SPACE', function () {
            this.scene.player.sprite.y = this.scene.player.sprite.y - 50;
            this.state = Player.RUN;
        });
        this.scene.input.keyboard.on('keyup-SHIFT', function () {
            this.scene.player.sprite.y = this.scene.player.sprite.y - 50;
            this.state = Player.RUN;
        });
        this.scene.input.keyboard.on('keydown-SHIFT', function () {
            this.scene.player.sprite.y = this.scene.player.sprite.y - 50;
            this.state = Player.MOB;
        });

        this.createAnimations();

        this.sprite.anims.play('right', true);
    }

    jump()
    {
        if (this.state != Player.MOB) {
            if (this.sprite.body.touching.down) {
                this.sprite.setVelocityY(-600);
                this.setScale(0.4, 28, 50);
            }
        }
    }

    squat()
    {
        if (this.sprite.body.touching.down) {
            this.state = Player.SQUAT;
            this.sprite.setOrigin(0.5, 0.5);
            this.setScale(2, 20, 33);
            this.sprite.anims.play('squat', true);
        }
    }

    boratTimeoutCallback()
    {
        this.state = Player.RUN;
    }

    strikeTimeoutCallback()
    {
        this.state = Player.RUN;
    }

    mobTimeoutCallback()
    {
        this.state = Player.RUN;
    }

    mob()
    {
        this.state = Player.MOB;
        this.mobTimeout = this.scene.time.delayedCall(6000, this.mobTimeoutCallback, [], this);
    }

    borat()
    {
        this.state = Player.BORAT;
        this.boratTimeout = this.scene.time.delayedCall(6000, this.boratTimeoutCallback, [], this);
    }

    strike()
    {
        this.state = Player.STRIKE;
        this.strikeTimeout = this.scene.time.delayedCall(500, this.strikeTimeoutCallback, [], this);
        this.strikeSound.play();
    }

    run()
    {
        if (this.state == Player.BORAT) {
            this.setScale(0.7);
            this.sprite.anims.play('borat', true);
            this.scene.speed = 3;
        } else if (this.state == Player.STRIKE) {
            this.setScale(2, 45, 50);
            this.sprite.anims.play('strike', true);
            this.scene.speed = 3;
        } else if (this.state == Player.MOB) {
            this.sprite.body.setSize(39, 38, false);
            this.setScale(2.7, 39, 38);
            this.sprite.anims.play('mob', true);
            return;
        } else {
            this.state = Player.RUN;
            this.scene.speed = 3;
            this.setScale(2, 28, 50);
            this.sprite.anims.play('right', true);
        }
    }

    jumping()
    {
        if (this.state == Player.BORAT) {
            this.setScale(0.7);
            this.sprite.anims.play('jump_borat', true);
            return;
        }

        if (this.sprite.body.velocity.y < 200 && this.sprite.body.velocity.y > -100) {
            this.setScale(2, 28, 50);
            this.sprite.anims.play('jump_up', true);
        } else {
            this.setScale(2, 28, 50);
            this.sprite.anims.play('jump_right', true);
        }
    }

    update()
    {
        /*if (!this.sprite.body.touching.down &&
            !this.scene.cursors.down.isDown &&
            !this.scene.cursors.shift.isDown) {
            this.jumping();
        } else {*/
            if (this.scene.cursors.up.isDown) {
                this.jump();
            } else if (this.scene.cursors.down.isDown ) {
                this.squat();
            } else if (this.scene.cursors.shift.isDown ) {
                this.mob();
            } else if (this.scene.cursors.left.isDown) {
                this.strike();
            } else if (this.scene.cursors.right.isDown) {
                this.borat();
            } else {
                this.run();
            }
        //}

    }
}
