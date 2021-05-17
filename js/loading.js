function loading(scene, loadingText)
{
    width = scene.cameras.main.width;
    height = scene.cameras.main.height;
    progressBar = scene.add.graphics();
    progressBox = scene.add.graphics();
    progressBox.fillStyle(0x99e550, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 + 75, 320, 50);

    titleText = scene.make.text({
        x: width / 2,
        y: height / 2 - 100,
        text: loadingText,
        style: {
            font: '20px monospace',
            fill: '#99e550'
        }
    });
    titleText.setOrigin(0.5, 0.5);

    loadingText = scene.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);

    percentText = scene.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);

    assetText = scene.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: '',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });

    assetText.setOrigin(0.5, 0.5);

    scene.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0x99e550, 1);
        progressBar.fillRect(width / 2 + 10 - 160, height / 2 + 75 + 10, 300 * value, 30);
    });

    scene.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
    });
}