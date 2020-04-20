// import paper from 'paper';
// import manipulateImagesFunction from './manipulateImages';

const paperComponent = function (imgID, paperEl, canvasId) {
    const paper = paperEl;
    paper.setup(document.getElementById(canvasId));
    /*eslint-disable*/
    const raster = new paper.Raster(imgID);
    raster.visible = false;

    raster.on('load', function () {
        // Since the example image we're using is much too large,
        // and therefore has way too many pixels, lets downsize it to
        // 40 pixels wide and 30 pixels high:
        raster.size = new paper.Size(20, 20);
        const srcLeftPos = raster.size.width / 4;
        const srcRightPos = raster.size.width - (raster.size.width / 4);
        const srcCenterXPos = raster.size.width / 2;
        const srcCenterYPos = raster.size.height / 2;
        const srcTopPos = raster.size.height / 5;
        const srcBtmPos = raster.size.height - (raster.size.height / 4);

        const averageColor = raster.getAverageColor().toCSS().replace(')', ',1)');

        $('#' + canvasId).attr('average-color', averageColor);
        $('#menuDecoration').attr('average-color-active', averageColor);
        $('#menuDecoration').click();
        let topColors = [];
        let btmColors = [];
        let centerColors = [];
        let leftColors = [];
        let rightColors = [];
        const amountOfColors = 10;
        const colorPickerSpacing = raster.size.width / amountOfColors;

        for (let i = 0; i < amountOfColors; i++) {
            topColors.push(raster.getPixel(i * colorPickerSpacing, srcTopPos));
            btmColors.push(raster.getPixel(i * colorPickerSpacing, srcBtmPos));
            (i % 2 === 0)
                ? centerColors.push(raster.getPixel(i * colorPickerSpacing, srcCenterYPos))
                : centerColors.push(raster.getPixel(srcCenterXPos, i * colorPickerSpacing));
            leftColors.push(raster.getPixel(srcLeftPos, i * colorPickerSpacing));
            rightColors.push(raster.getPixel(srcRightPos, i * colorPickerSpacing));
        }

        // const backgroundCanvasWidth = averageColor;
        const backgroundCanvasWidth = 2 * paper.view.size.width;

        const backgroundCanvas = new paper.Path.Rectangle({
            point: [0, 0],
            size: [backgroundCanvasWidth, backgroundCanvasWidth],
        });
        backgroundCanvas.position = paper.view.center;
        // backgroundCanvas.fillColor = averageColor;
        backgroundCanvas.fillColor = {
            gradient: {
                stops: [
                    [centerColors[0], 0],
                    [centerColors[1], 0.1],
                    [centerColors[2], 0.2],
                    [centerColors[3], 0.3],
                    [centerColors[4], 0.4],
                    [centerColors[5], 0.5],
                    [centerColors[6], 0.6],
                    [centerColors[7], 0.7],
                    [centerColors[8], 0.8],
                    [centerColors[9], 0.9],
                    [centerColors[10], 1],
                ],
            },
            origin: [0, -paper.view.size.height / 2],
            destination: [0, paper.view.size.height + paper.view.size.height / 2],
        };

        // The leftBreakAmount of segment points we want to create:
        const leftBreakAmount = 8;
        const btmBreakAmount = 10;
        const height = 150;
        const leftSin = new paper.Path();

        leftSin.fillColor = {
            gradient: {
                stops: [
                    [leftColors[0], 0],
                    [leftColors[1], 0.1],
                    [leftColors[2], 0.2],
                    [leftColors[3], 0.3],
                    [leftColors[4], 0.4],
                    [leftColors[5], 0.5],
                    [leftColors[6], 0.6],
                    [leftColors[7], 0.7],
                    [leftColors[8], 0.8],
                    [leftColors[9], 0.9]
                ],
            },
            origin: [0, 0],
            destination: [0, paper.view.size.height],
            strokeWidth: 30,
        }

        for (let i = 0; i <= leftBreakAmount; i++) {
            leftSin.add(new paper.Point(0, ((i / leftBreakAmount) * paper.view.size.height)));
        }

        const btmSin = new paper.Path();
        btmSin.fillColor = {
            gradient: {
                stops: [
                    [btmColors[0], 0],
                    [btmColors[1], 0.1],
                    [btmColors[2], 0.2],
                    [btmColors[3], 0.3],
                    [btmColors[4], 0.4],
                    [btmColors[5], 0.5],
                    [btmColors[6], 0.6],
                    [btmColors[7], 0.7],
                    [btmColors[8], 0.8],
                    [btmColors[9], 0.9]
                ],
                // radial: true,
            },
            origin: [0, paper.view.size.height],
            destination: [paper.view.size.width, paper.view.size.height],
            strokeWidth: 100,
        }

        const topSin = new paper.Path({
            strokeColor: {
                gradient: {
                    stops: [
                        [topColors[0], 0],
                        [topColors[1], 0.1],
                        [topColors[2], 0.2],
                        [topColors[3], 0.3],
                        [topColors[4], 0.4],
                        [topColors[5], 0.5],
                        [topColors[6], 0.6],
                        [topColors[7], 0.7],
                        [topColors[8], 0.8],
                        [topColors[9], 0.9]
                    ]
                },
                origin: [0, 0],
                destination: [paper.view.size.width, 0]
            },
            strokeWidth: 300
        });

        topSin.add(new paper.Point(-40, -100));
        topSin.add(new paper.Point((paper.view.size.width / 2) - 400, 100));
        topSin.add(new paper.Point((paper.view.size.width / 2) - 200, 200));
        topSin.add(new paper.Point((paper.view.size.width / 2) - 0, paper.view.size.height / 2 - 400));
        topSin.add(new paper.Point((paper.view.size.width / 2) + 200, paper.view.size.height / 2));
        topSin.add(new paper.Point((paper.view.size.width / 2) + 400, paper.view.size.height / 2 + 400));
        topSin.add(new paper.Point(paper.view.size.width + 40, paper.view.size.height));

        for (let i = 0; i <= btmBreakAmount; i++) {
            btmSin.add(new paper.Point((i / btmBreakAmount * paper.view.size.width), paper.view.size.height));
        }

        leftSin.add(new paper.Point(0, paper.view.size.height));
        leftSin.add(new paper.Point(0, 0));
        btmSin.add(new paper.Point(paper.view.size.width, paper.view.size.height));
        btmSin.add(new paper.Point(0, paper.view.size.height));
        btmSin.closed = true;
        leftSin.closed = true;

        const blob1 = new paper.Shape.Ellipse(new paper.Rectangle(new paper.Point(20, 20), new paper.Size(1000, 600)));

        blob1.fillColor = {
            gradient: {
                stops: [
                    [centerColors[0], 0],
                    [centerColors[2], 0.35],
                    [centerColors[4], 0.5],
                    [centerColors[6], 0.75],
                    [centerColors[8], 1],
                ],
                radial: true
            },
            origin: [blob1.view.center.y, blob1.view.center.y],
            destination: blob1.view.bounds
        };

        blob1.position.x = paper.view.size.width;
        blob1.position.y = 0;

        paper.view.onFrame = function (e) {
            for (let i = 0; i <= leftBreakAmount; i++) {
                const segment = leftSin.segments[i];
                const sinus = Math.sin(e.time * 0.5 + i);
                segment ? segment.point.x = sinus * (height + 50) + 450 : '';
                const segmentTop = topSin.segments[i];
                segmentTop ? segmentTop.point.y = sinus * (height + 100) + 150 : '';
            }
            for (let i = 0; i <= btmBreakAmount; i++) {
                const sinus = Math.sin(e.time * 0.5 + i);
                const segmentBtm = btmSin.segments[i];
                segmentBtm ? segmentBtm.point.y = paper.view.size.height - (sinus * (height + 150) + 150) : '';
            }
            backgroundCanvas.rotate(0.5);
            leftSin.smooth();
            topSin.smooth();
            topSin.rotate(0.15);
            btmSin.smooth();
            blob1.rotate(0.75);
        };
    });
    /*eslint-enable*/
};

export default paperComponent;