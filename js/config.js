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
    scene: [ Game, Pause, GameOver ]
};
var game = new Phaser.Game(config);