import turnJS from '../vendor/turn-js/turn.min';

turnJS();

const flipBookComponent = function () {
    if ($('#flipbook').length) {
        $('#flipbook').turn({
            width: 1200,
            height: 900,
            autoCenter: true,
            turnCorners: 'bl,br'
        });
    }
};
export default flipBookComponent;