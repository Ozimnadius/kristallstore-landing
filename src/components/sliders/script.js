window.addEventListener('load', function () {

    const productsSwiper = new Swiper('.products__swiper', {
        slidesPerView: "auto",
        spaceBetween: 20,
        rewind: true,
        navigation: {
            nextEl: '.products__next',
            prevEl: '.products__prev',
        },
        breakpoints: {
            1437.98: {
                slidesPerView: 4,
                spaceBetween: 20
            }
        }
    });

    const revsSwiper = new Swiper('.revs__swiper', {
        slidesPerView: "auto",
        spaceBetween: 10,
        rewind: true,
        navigation: {
            nextEl: '.revs__next',
            prevEl: '.revs__prev',
        },
        breakpoints: {
            737.98: {
                spaceBetween: 20
            }
        }
    });

    


});