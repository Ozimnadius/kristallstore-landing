

window.addEventListener('load', function () {
    new Events();
});

class Events {
    constructor() {
        this.events = {
            click: {
                openMenu: this.openMenu,
                closeMenu: this.closeMenu,
                openForm: this.openForm,
                closeForm: this.closeForm,
                scrollTo: this.scrollTo,
            },
            submit: {
                sendForm: this.sendForm
            }
        };
        this.call = document.querySelector('.call');
        this.menu = document.querySelector('.header__nav');

        this.init();
    }

    init() {

        for (let key in this.events) {
            let items = this.events[key];

            document.querySelector('body').addEventListener(key, (e) => {
                for (let name in items) {
                    let target = e.target.closest(`[data-event="${name}"]`);
                    if (target !== null) {
                        items[name].call(this, e, target)
                    }
                }
            });
        }

        this.call.addEventListener('click', (e) => {
            if (!e.target.closest('.call__form')) {
                this.closeForm(e);
            }
        });
    }

    openMenu(e, elem) {
        e.preventDefault();
        elem.classList.add('active');
        this.menu.classList.add('active');
        document.querySelector('html').classList.add('ovh');
        setTimeout(() => {
            elem.dataset.event = 'closeMenu';
        }, 100);
    }

    closeMenu(e, elem) {
        e.preventDefault();
        this.menu.classList.remove('active');
        document.querySelector('html').classList.remove('ovh');
        elem.classList.remove('active');
        setTimeout(() => {
            elem.dataset.event = 'openMenu';
        }, 100);
    }

    openForm(e, elem) {
        e.preventDefault();
        this.call.showModal();
        document.querySelector('html').classList.add('ovh');
    }

    closeForm(e, elem) {
        e.preventDefault();
        this.call.close();
        document.querySelector('html').classList.remove('ovh');
    }

    sendForm(e, elem) {
        e.preventDefault();

        let form = elem,
            data = $(form).serialize(),
            url = form.action;

        $.ajax({
            dataType: "json",
            type: "POST",
            url: url,
            data: data,
            success: function (result) {
                if (result.status) {
                    form.classList.add("ok");
                } else {
                    alert("Что-то пошло не так, попробуйте еще раз!!!");
                }
            },
            error: function (result) {
                alert("Что-то пошло не так, попробуйте еще раз!!!");
            },
        });
    }

    scrollTo(e, elem) {
        e.preventDefault();

        if (window.matchMedia('(max-width: 767.98px)').matches) {
            this.closeMenu(e, document.querySelector('.header__mmenu-btn'));
        }

        document.querySelector(elem.hash).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

};
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
window.addEventListener('load', function () {
    setMainOffset();
    window.addEventListener('resize', setMainOffset);

    setHeaderHeight();
    window.addEventListener('resize', setHeaderHeight);

    $('input[type="tel"]').inputmask('+7 (999) 999-99-99');
});

function setMainOffset() {
    let fullW = document.body.clientWidth;
    let containerW = document.querySelector('.container').clientWidth - 30;
    document.body.style.setProperty('--main-offset', `${(fullW - containerW) / 2}px`);
}

function setHeaderHeight() {
    let headerHeight;
    headerHeight = document.querySelector('.header').offsetHeight;
    document.querySelector('body').style.setProperty("--header-height", `${headerHeight}px`);
}