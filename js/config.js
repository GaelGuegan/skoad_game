function getGameDimensions() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Maintain aspect ratio of 2:1 (original was 800x400)
    const aspectRatio = 2;
    
    let width, height;
    
    if (screenWidth / screenHeight > aspectRatio) {
        // Screen is wider than game aspect ratio
        height = screenHeight;
        width = height * aspectRatio;
    } else {
        // Screen is taller than game aspect ratio
        width = screenWidth;
        height = width / aspectRatio;
    }
    
    return {
        width: Math.floor(width),
        height: Math.floor(height)
    };
}

var dimensions = getGameDimensions();

var config = {
    type: Phaser.AUTO,
    width: dimensions.width,
    height: dimensions.height,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: dimensions.width,
        height: dimensions.height
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    },
    pixelArt: true,
    scene: [ Game, Pause, GameOver ]
};

// Handle window resize
window.addEventListener('resize', () => {
    const newDimensions = getGameDimensions();
    game.scale.resize(newDimensions.width, newDimensions.height);
});

var game = new Phaser.Game(config);
