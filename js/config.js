FBInstant.initializeAsync().then(function() {

    var config = {
        type: Phaser.AUTO,
        width: 800,//window.innerWidth,
        height: 600, //window.innerHeight,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 900 },
                debug: false
            }
        },
        pixelArt: true,
        scene: [  Game, Pause, GameOver, Preloader ]
    };
    var game = new Phaser.Game(config);

});
