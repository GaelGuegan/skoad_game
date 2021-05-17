FBInstant.initializeAsync().then(function() {

    FBInstant.setLoadingProgress(100);

    FBInstant.startGameAsync().then(function() {

        var config = {
            type: Phaser.AUTO,
            width: window.innerWidth, // 800,
            height: window.innerHeight, // 400,
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
