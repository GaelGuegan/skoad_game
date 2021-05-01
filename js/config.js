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
    scene: [ Game, Pause ]
};
var game = new Phaser.Game(config);