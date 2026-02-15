class Menu extends Phaser.Scene
{
    constructor ()
    {
        super('menu');
    }

    preload ()
    {
        this.load.image('background', 'assets/mont_saint_michel.png');
    }

    create ()
    {
        // Background
        const background = this.add.image(0, 0, 'background');
        background.setOrigin(0, 0);
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // Semi-transparent overlay for better text visibility
        const overlay = this.add.rectangle(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            this.cameras.main.width,
            this.cameras.main.height,
            0x000000,
            0.5
        );

        // Title
        const title = this.add.text(
            this.cameras.main.width / 2,
            50,
            'SKOAD GAME',
            {
                fontSize: '64px',
                fill: '#FFD700',
                fontFamily: 'Arial, sans-serif',
                fontStyle: 'bold',
                stroke: '#000000',
                strokeThickness: 3
            }
        );
        title.setOrigin(0.5, 0.5);

        // Button configuration
        const buttonWidth = 200;
        const buttonHeight = 60;
        const centerX = this.cameras.main.width / 2;
        const startY = 150;
        const spacing = 80;

        const buttons = [
            { text: 'JOUER', scene: 'game', key: 'play' },
            { text: 'OPTIONS', scene: 'options', key: 'options' },
            { text: 'AIDE', scene: 'help', key: 'help' },
            { text: 'CREDITS', scene: 'credits', key: 'credits' }
        ];

        buttons.forEach((button, index) => {
            const y = startY + (index * spacing);
            
            // Create button background
            const buttonBg = this.add.rectangle(
                centerX,
                y,
                buttonWidth,
                buttonHeight,
                0x4CAF50,
                1
            );
            buttonBg.setInteractive({ useHandCursor: true });

            // Create button text
            const buttonText = this.add.text(
                centerX,
                y,
                button.text,
                {
                    fontSize: '32px',
                    fill: '#FFFFFF',
                    fontFamily: 'Arial, sans-serif',
                    fontStyle: 'bold'
                }
            );
            buttonText.setOrigin(0.5, 0.5);

            // Button hover effects
            buttonBg.on('pointerover', function() {
                buttonBg.setFillStyle(0x45a049);
                buttonText.setFill('#FFFF00');
            });

            buttonBg.on('pointerout', function() {
                buttonBg.setFillStyle(0x4CAF50);
                buttonText.setFill('#FFFFFF');
            });

            // Button click handler
            buttonBg.on('pointerdown', () => {
                if (button.scene === 'game') {
                    this.scene.start('game');
                } else {
                    // For now, just show an alert or switch scene
                    // You can create dedicated scenes for options, help, credits later
                    alert(button.text + ' - À implémenter');
                }
            });
        });
    }
}
