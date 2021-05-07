class Pause extends Phaser.Scene
{
    constructor ()
    {
        super('pause');
    }

    preload ()
    {
        this.load.image('pause', 'assets/pause.png');
    }

    create ()
    {
        this.input.on('pointerdown', function() {
            this.scene.scene.stop();
            this.scene.scene.resume('game');
        });

        var pause = this.add.image(config.width/2, config.height/2, 'pause');
    }
}

class GameOver extends Phaser.Scene
{
    constructor ()
    {
        super('gameover');
    }

    preload ()
    {
        this.load.image('gameover', 'assets/gameover.png');
    }

    create ()
    { 
        this.input.on('pointerdown', function() {
            this.scene.scene.stop();
            this.scene.scene.start('game');
        });

        var gameover = this.add.image(config.width/2, config.height/2, 'gameover');
    }

}
