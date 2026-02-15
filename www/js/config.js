function getGameDimensions() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Maintain aspect ratio of 2:1 (original was 800x400)
    const aspectRatio = 2;
    
    let width, height;
    
    if (screenWidth / screenHeight > aspectRatio) {
        height = screenHeight;
        width = height * aspectRatio;
    } else {
        width = screenWidth;
        height = width / aspectRatio;
    }
    
    return {
        width: Math.floor(width),
        height: Math.floor(height)
    };
}

var dimensions = getGameDimensions();
const BASE_WIDTH = 800;
const BASE_HEIGHT = 400;

var config = {
    type: Phaser.AUTO,
    width: BASE_WIDTH,
    height: BASE_HEIGHT,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        /*width: dimensions.width,
        height: dimensions.height*/
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    },
    pixelArt: true,
    scene: [ Menu, Game, Pause, GameOver ]
};

// Handle window resize
window.addEventListener('resize', () => {
    const newDimensions = getGameDimensions();
    game.scale.resize(newDimensions.width, newDimensions.height);
});

var game = new Phaser.Game(config);
