var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 981 },
            debug: false
        }
    },
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars;
var bombs;
var platforms;
var obstacles;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var xp = 0;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('background', '/assets/mont_saint_michel.png');
    this.load.image('ground', '/assets/ground.png');
    this.load.image('obstacle', '/assets/obstacle.png');
    this.load.spritesheet('dude', '/assets/skoad_man.png', { frameWidth: 32, frameHeight: 50 });
    this.load.spritesheet('bird', '/assets/bird.png', { frameWidth: 39, frameHeight: 28 });
    this.load.audio('eye_music', '/assets/skoad_music.wav');
}

function create ()
{
    var music = this.sound.add('eye_music');
    music.play({loop: true});

    var bg = this.add.image(0, 0, 'background');
    bg.setOrigin(0, 0);
    bg.setDisplaySize(config.width, config.height-20);

    //platforms = this.physics.add.staticImage(config.width/2, config.height-15, 'ground');
    //platforms = this.physics.add.image(config.width/2, config.height-15, 'ground');
    //platforms.setCollideWorldBounds(true);

    ground = this.add.tileSprite(config.width/2, config.height-15, 0, 0, 'ground');
    //this.arcade.add.gameObject(ground);
    //ground.body.setCollideWorldBounds(true);
    //game.physics.arcade.enable([ground]);
    this.physics.add.existing(ground, false);
    ground.body.setCollideWorldBounds(true);

    var bird = this.add.sprite(300, 100, 'bird');
    bird.setScale(2);
    this.anims.create({
        key: 'bleft',
        frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    });

    bird.anims.play('bleft', true);

    /*obstacles = this.physics.add.group();
    obstacle = obstacles.create(700, 300, 'obstacle');
    obstacle.setCollideWorldBounds(true);
    obstacle.setVelocity(-80);
    this.physics.add.collider(obstacle, platforms);*/

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

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, ground);
    //this.physics.add.collider(obstacle, ground);
}

function update ()
{
    if (gameOver)
    {
        return;
    }

    /*if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);
        player.anims.play('idle_left');

    }*/

    /*if (cursors.left.isUp)
    {
        player.setVelocityX(0);
        player.anims.play('idle_left');
    }
    else if (cursors.right.isUp)
    {
        player.setVelocityX(0);
        player.anims.play('idle_right');
        console.log("right up");
    }*/
    ground.tilePositionX+=0.7;

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
    //xp++;
    //platforms.setPosition(xp, platforms.y);

}

