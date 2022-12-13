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