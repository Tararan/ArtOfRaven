'use strict';
/*eslint-disable*/
import dateTimeComponent from './dateTime';
// import flipBookComponent from './flipBook';
// import swipersFunction from './swiper';
import linkComponents from './linkAnimations';
import toggleNavigationFunction from './toggleNavigation';
import fetchImagesFromDeviantComponent from './fetchDeviantImages/fetchDeviantArtImages';
const functionsInit = function () {
    $(function () {
        dateTimeComponent();
        // flipBookComponent();
        linkComponents();
        toggleNavigationFunction();
        fetchImagesFromDeviantComponent();
        // swipersFunction();
    });
};
/*eslint-enable*/

export default functionsInit;