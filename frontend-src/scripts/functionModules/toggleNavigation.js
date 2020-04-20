const toggleNavigationFunction = function () {
    /*eslint-disable*/
    const navBtn = $('.nav__menu-btn');
    const nav = $('.nav');
    const navOpen = 'nav--is-open';
    const menu = $('.menu');
    const menuOpen = 'menu--is-open';
    const canvasMenu = $('.canvas--menu');
    const canvasMenuOpen = 'canvas--open';

    navBtn.on('click', function () {
        canvasMenu.toggleClass(canvasMenuOpen);
        menu.toggleClass(menuOpen);
        nav.toggleClass(navOpen);
    });

    const paperEl = new paper.PaperScope();
    paperEl.setup(document.getElementById('menuDecoration'));
    // linear interpolation between two values a and b
    // u controls amount of a/b and is in range [0.0,1.0]
    // lerp = function (a, b, u) {
    //     return (1 - u) * a + u * b;
    // };

    // const fade = function (start, end, duration) {
    //     var interval = 10;
    //     var steps = duration / interval;
    //     var step_u = 1.0 / steps;
    //     var u = 0.0;
    //     var theInterval = setInterval(function () {
    //         if (u >= 1.0) { clearInterval(theInterval) }
    //         var r = parseInt(lerp(start.r, end.r, u));
    //         var g = parseInt(lerp(start.g, end.g, u));
    //         var b = parseInt(lerp(start.b, end.b, u));
    //         var colorname = 'rgb(' + r + ',' + g + ',' + b + ')';
    //         leftSin.fillColor = colorname;
    //         u += step_u;
    //     }, interval);
    // };

    const leftSin = new paper.Path({
        fillColor: 'black',
        strokeCap: 'square'
    });

    $('#menuDecoration').on('click', function () {
        const self = $(this);
        console.log('#menuDecoration clicked');
        console.log('> self.attr("average-color")');
        console.log(self.attr('average-color-active'));
        console.log('> leftSin.fillColor');
        console.log(leftSin.fillColor);
        const getRBGValues = self.attr('average-color-active').split('(')[1].replace(')','');
        const redColor = getRBGValues.split(',')[0];
        console.log('%c > getRBGValues','color: yellow; font-size: small');
        console.log(redColor);
        const nextColor = {};
        const currentColor = { r: leftSin.fillColor.red, g: leftSin.fillColor.green, b: leftSin.fillColor.blue };
        // fade();
    });

    leftSin.fillColor.alpha = [0.65];
    const amount = 5;
    let height = 10;
    const blobHeight = 75;

    for (let i = 0; i <= amount; i++) {
        const posX = (i === 0) ? ((amount / 1) * 30) : ((amount / i) * 30);
        const posY = (i === 0) ? ((0.5 / amount) * blobHeight) : ((i / amount) * blobHeight);
        leftSin.add(new paper.Point(posX, posY));
    }

    leftSin.add(new paper.Point(-50, blobHeight));
    leftSin.add(new paper.Point(-50, 0));
    leftSin.add(new paper.Point(100, 0));
    leftSin.closed = true;
    leftSin.view.onFrame = function (e) {
        for (let i = 0; i <= (amount); i++) {
            const sinus = Math.sin(e.time * 0.8 + i);
            const segment = leftSin.segments[i];
            segment ? segment.point.x = sinus * (height + 20) + 110 : '';
        };
        leftSin.smooth();
        const timer = Math.floor(e.time / 10);
        if (timer % 2 !== 0) {
            leftSin.rotate(0.2);
        } else {
            leftSin.rotate(-0.2);
        }
    }
    /*eslint-enable*/
};
export default toggleNavigationFunction;