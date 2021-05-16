FBInstant.initializeAsync().then(function() {

    FBInstant.setLoadingProgress(100);

    FBInstant.startGameAsync().then(function() {

        var config = {
            type: Phaser.AUTO,
            width: 800,//window.innerWidth,
            height: 400, //window.innerHeight,
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

});
