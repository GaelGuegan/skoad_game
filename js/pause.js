class Pause extends Phaser.Scene
{
    constructor ()
    {
        super('demo');
        this.state = 0;
    }

    preload ()
    {
        this.load.image('pause', 'assets/pause.png');
    }

    create ()
    {
        this.state = this.add.rectangle(config.width-100, 25, 50, 50, 0, 0).setInteractive();
        this.state.on('pointerdown', function() {
            this.scene.scene.stop();
            this.scene.scene.resume('background');
        });

        var pause = this.add.image(config.width/2, config.height/2, 'pause');
    }

    update ()
    {
    }
}