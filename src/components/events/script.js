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