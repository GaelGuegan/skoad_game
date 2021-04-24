var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 981 },
            debug: true
        }
    },
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update,
        render: render,
    }
};

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

var game = new Phaser.Game(config);

function loading(scene)
{
    var progressBar = scene.add.graphics();
    var progressBox = scene.add.graphics();
    progressBox.fillStyle(0x99e550, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    var width = scene.cameras.main.width;
    var height = scene.cameras.main.height;
    var titleText = scene.make.text({
        x: width/2,
        y: height/2 - 100,
        text: 'SKOAD GAME',
        style: {
            font: '20px monospace',
            fill: '#99e550'
        }
    });
    titleText.setOrigin(0.5, 0.5);
    var loadingText = scene.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);
    
    var percentText = scene.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = scene.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: '',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });

    assetText.setOrigin(0.5, 0.5);

    scene.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0x99e550, 1);//0x6abe30, 1);
        progressBar.fillRect(250, 280, 300 * value, 30);
    });

    scene.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
    });
}

function preload ()
{
    /***********/
    /* LOADING */
    /***********/
    loading(this);

    this.load.image('background', 'assets/mont_saint_michel.png');
    this.load.image('ground', 'assets/ground2.png');
    this.load.spritesheet('state', 'assets/state.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('sound', 'assets/sound.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('box', 'assets/box.png', { frameWidth: 65, frameHeight: 62 });
    this.load.audio('eye_music', 'assets/skoad_music.mp3');
    this.load.spritesheet('dude', 'assets/skoad_man.png', { frameWidth: 32, frameHeight: 50 });
    this.load.spritesheet('bird', 'assets/bird.png', { frameWidth: 39, frameHeight: 28 });
}

function create ()
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
    sound = this.add.sprite(config.width-50, 25, 'sound').setInteractive();
    sound.on('pointerdown', function () {
        sound.pauseAll();
        state.setTexture('music', 1);
    });

    /*********/
    /* PAUSE */
    /*********/
    state = this.add.sprite(config.width-100, 25, 'state').setInteractive();
    state.on('pointerdown', function () {
        console.log("scene :" + this.scene.scene);
        console.log("scene :" + this.scene.scene.isActive());
        this.scene.scene.pause();
        state.setActive(true);
        /*if( this.scene.scene.isActive()) {
            //this.scene.scene.pause();
       // console.log("scene :" + this.scene.scene);
            //game.paused = true;
            music.pause();
            state.setTexture('state', 1);
        } else {
            //this.scene.scene.resume();
            music.resume();
            state.setTexture('state', 0);
        }
        //game.scene.pause("default");
        //game.scene.start();*/
    });
    

    /**********/
    /* GROUND */
    /**********/
    ground = this.add.tileSprite(config.width/2, config.height, 0, 0, 'ground');
    this.physics.add.existing(ground, false);
    ground.body.setCollideWorldBounds(true);
    ground.body.setSize(ground.width, ground.height-13);
    ground.body.setOffset(0, 13);

    /********/
    /* BIRD */
    /********/
    bird = this.physics.add.sprite(650, 100, 'bird');
    bird.setScale(2);
    bird.body.setAllowGravity(false);
    this.anims.create({
        key: 'bird',
        frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    });
    bird.anims.play('bird', true);

    /*******/
    /* BOX */
    /*******/
    box = this.physics.add.sprite(750, 100, 'box');
    box.setScale(1.5);
    box.body.setSize(box.width, box.height);
    box.body.setOffset(0, -5);
    this.anims.create({
        key: 'box',
        frames: this.anims.generateFrameNumbers('box', { start: 0, end: 10 }),
        frameRate: 10,
        repeat: -1
    });
    box.anims.play('box', true);

    /**********/
    /* PLAYER */
    /**********/
    player = this.physics.add.sprite(100, 100, 'dude');
    player.setScale(2);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'idle_left',
        frames: [ { key: 'dude', frame: 5 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'idle_right',
        frames: [ { key: 'dude', frame: 6 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 7, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
    player.anims.play('right', true);


    cursors = this.input.keyboard.createCursorKeys();
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    /*************/
    /* COLLISION */
    /*************/
    this.physics.add.collider(player, ground);
    this.physics.add.collider(box, ground);
    this.physics.add.collider(player, box);
    this.physics.add.collider(bird, ground);
    this.physics.add.collider(bird, player);

}

function update ()
{
    if (gameOver)
    {
        return;
    }

    if (Phaser.Math.Between(0, 800) == 2) {
        this.physics.moveToObject(bird, player, 200);
    }

    ground.tilePositionX += speed;
    box.x += -speed;

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }

    if (box.x + box.width <= -1) {
        box.x = config.width - box.width;
        box.y = 300;
    }

}

function render()
{
/*
    game.debug.body(ground);
    game.debug.body(player);
    game.debug.body(box);
    */
}
