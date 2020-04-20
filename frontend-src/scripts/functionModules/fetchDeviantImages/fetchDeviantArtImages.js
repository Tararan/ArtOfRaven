 import swipersFunction from '../swiper';
import turnJS from '../../vendor/turn-js/turn.min';

const fetchImagesFromDeviantComponent = function () {
    const deviantUrl = 'https://www.deviantart.com/infamous-raven/gallery/69797959/my-precious';
    const cors_api_url = 'https://cors-anywhere.herokuapp.com/';
    const scrapedElClass = '._3BDke ._3ApeV';
    const swiperWrapper = $('.swiper-wrapper');
    const flipBook = $('#flipbook');

    const elURLForScraping = cors_api_url + deviantUrl;

    $.get(elURLForScraping, function (response) {
        const scrapedElContainer = $(response).find(scrapedElClass);
        const scrapedEl = scrapedElContainer.find('noscript');
        scrapedEl.each(function (idx) {
            const self = $(this);
            const scrapedElSrc = $(document.createRange().createContextualFragment(self.text()).firstChild);

            const scrapedElImgWidth = scrapedElSrc.attr('src').split('/w_')[1].split(',')[0];
            const scrapedElImgWidthRatio = (1000 / scrapedElImgWidth);
            const scrapedElImgHeight = scrapedElSrc.attr('src').split(',h_')[1].split(',')[0];
            const scaledWidth = Math.floor(scrapedElImgWidthRatio * scrapedElImgWidth);
            const scaledHeight = Math.floor(scrapedElImgWidthRatio * scrapedElImgHeight);
            const formattedScrapedElSrc = scrapedElSrc.attr('src')
                .replace(/w_\w*/g, `w_${scaledWidth}`)
                .replace(/h_\w*/g, `h_${scaledHeight}`);
            const swiperSlide = `
                    <div class="swiper-slide">
                        <div class="swiper-slide__img">
                            <img crossOrigin="anonymous" class="img" src=${formattedScrapedElSrc} alt='' />
                        </div>
                    </div>
                `;

            let flipbookPage = `
                <div
                    style="background-image: url(${formattedScrapedElSrc})">
                </div>
            `;

            if (idx === 0) {
                flipbookPage = `
                    <div style="background-image: url(${formattedScrapedElSrc})" class="hard">
                        <div class="book__cover">
                            <h1 class="book__cover-title">
                                Art Of Raven
                            </h1>
                            <h2 class="book__cover-subtitle">
                                Digital artist
                            </h2>
                            <p class="book__cover-description">
                                Check out some of my work by clicking on edges of this book to list through my artwork.
                                <br />
                                To contact me, hover over the iphone in the corner.
                            </p>
                        </div>
                    </div>
                `;
            }
            // if (idx === 1) {
            //     flipbookPage = `
            //         <div class="hard"
            //             style="background-image: url(${formattedScrapedElSrc})">
            //         </div>
            //     `;
            // }
            // if (idx === scrapedEl.length - 1) {
            //     flipbookPage = `
            //         <div class="hard"
            //             style="background-image: url(${formattedScrapedElSrc})">
            //         </div>
            //     `;
            // }
            if (idx === scrapedEl.length) {
                flipbookPage = `
                    <div style="background-image: url(${formattedScrapedElSrc})" class="hard">
                        <div class="book__cover">
                            <h1 class="book__cover-title">
                                Credits
                            </h1>
                            <h2 class="book__cover-subtitle">
                                Digital artist
                            </h2>
                            <p class="book__cover-description">
                                Check out some of my work by clicking on edges of this book to list through my artwork.
                                <br />
                                To contact me, hover over the iphone in the corner.
                            </p>
                        </div>
                    </div>
                `;
            }
            if (swiperWrapper.length > 0) {
                swiperWrapper.append(swiperSlide);
            }
            // console.log('> flipbookPage');
            // console.log(flipbookPage);
            if (flipBook.length > 0) {
                flipBook.append(flipbookPage);
                // console.log('> flipBook');
                // console.log(flipBook);
            }
        });
        turnJS();
        swipersFunction();

        // const flipBookComponent = function () {
        if ($('#flipbook').length) {
            $('#flipbook').turn({
                width: 1200,
                height: 900,
                autoCenter: true,
                turnCorners: 'bl,br'
            });
        }
        // };

    });
};

export default fetchImagesFromDeviantComponent;