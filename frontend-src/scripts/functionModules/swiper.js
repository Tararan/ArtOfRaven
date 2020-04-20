import Swiper from 'swiper';
import paperComponent from './paper';

/*eslint-disable*/
const swipersFunction = function () {
    console.log('swipersFunction loaded');
    $('#active').removeClass('canvas--inactive');

    const swiperSlide = $('.swiper-slide');
    const tabSlide = $('.app--portfolio .window__toolbar--tabs .window__toolbar-text');

    swiperSlide.each(function (index) {
        const self = $(this);
        self.attr('index', index);
        $(tabSlide[index]).attr('index', self.attr('index'));
        const swiperSlideImg = self.find('.img');
        swiperSlideImg.attr('id', 'img-' + index);
    });

    const swiperEl = $('.swiper-container');
    swiperEl.each(function (index) {
        const self = $(this);
        self.addClass(`swiper-container-${index}`);

        const swiper = new Swiper('.swiper-container-' + index, {
            slidesPerView: 'auto',
            centeredSlides: true,
            slideToClickedSlide: true,
            keyboard: {
                enabled: true,
            },
        });

        const activeSlide = $(`.swiper-slide[index=${swiper.activeIndex}]`);
        const activeSlideImgId = activeSlide.find('.img').attr('id');
        const nextSlideImgId = activeSlide.next('.swiper-slide').find('.img').attr('id');


        // const colorChangeFunction = function () {
        //     const activeColor = $('.canvas--bg').not('.canvas--inactive').attr('average-color');
        //     const inactiveColor = $('.canvas--bg.canvas--inactive').attr('average-color');

        //     console.log(activeColor);
        //     console.log(inactiveColor);

        // };

        let mypapers = [];
        mypapers[0] = new paper.PaperScope();
        mypapers[1] = new paper.PaperScope();
        paper = mypapers[0];
        $('#active').attr('current', activeSlideImgId);
        paperComponent(activeSlideImgId, paper, 'active');
        paper = mypapers[1];
        $('#next').attr('current', nextSlideImgId);
        paperComponent(nextSlideImgId, paper, 'next');

        let indexSlide = 0;
        swiper.on('slideChangeTransitionEnd', function () {
            indexSlide = indexSlide + 1;
            mypapers = [];
            mypapers[0] = new paper.PaperScope();
            mypapers[1] = new paper.PaperScope();
            const activeimgId = 'img-' + swiper.activeIndex;

            if ($('#active').hasClass('canvas--inactive')) {
                paper = mypapers[0];
                $('#active').attr('current', activeimgId);
                paperComponent(activeimgId, paper, 'active');
            }
            if ($('#next').hasClass('canvas--inactive')) {
                paper = mypapers[1];
                $('#next').attr('current', activeimgId);
                paperComponent(activeimgId, paper, 'next');
            }
            $('#active').toggleClass('canvas--inactive');
            $('#next').toggleClass('canvas--inactive');

        });
    });

    /*eslint-enable*/
};

export default swipersFunction;