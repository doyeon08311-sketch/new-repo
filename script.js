document.addEventListener('DOMContentLoaded', () => {

  /* MAIN VISUAL SLIDER */

  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroCurrent = document.querySelector('.hero-current');
  const heroPrev = document.querySelector('.hero-prev');
  const heroNext = document.querySelector('.hero-next');
  const heroProgress = document.querySelector('.hero-line-progress');

  let heroIndex = 0;
  let heroTimer;

  const heroDuration = 6000;


  function resetHeroProgress() {

    if (!heroProgress) {
      return;
    }

    heroProgress.classList.remove('running');

    void heroProgress.offsetWidth;

    heroProgress.classList.add('running');
  }


  function showHeroSlide(index) {

    if (!heroSlides.length) {
      return;
    }

    heroSlides.forEach(slide => {
      slide.classList.remove('active');
    });

    heroIndex =
      (index + heroSlides.length) %
      heroSlides.length;

    heroSlides[heroIndex].classList.add('active');

    if (heroCurrent) {
      heroCurrent.textContent =
        String(heroIndex + 1).padStart(2, '0');
    }

    resetHeroProgress();
  }


  function startHeroSlider() {

    clearInterval(heroTimer);

    heroTimer = setInterval(() => {
      showHeroSlide(heroIndex + 1);
    }, heroDuration);
  }


  if (heroNext) {

    heroNext.addEventListener('click', () => {

      showHeroSlide(heroIndex + 1);

      startHeroSlider();

    });

  }


  if (heroPrev) {

    heroPrev.addEventListener('click', () => {

      showHeroSlide(heroIndex - 1);

      startHeroSlider();

    });

  }


  showHeroSlide(0);
  startHeroSlider();


  /* PRODUCT SLIDER */

  const productSlides =
    document.querySelectorAll('.product-slide');

  const productDots =
    document.querySelectorAll('.product-dot');

  const productPrev =
    document.querySelector('.product-prev');

  const productNext =
    document.querySelector('.product-next');

  let productIndex = 0;


  function showProduct(index) {

    if (!productSlides.length) {
      return;
    }

    productSlides.forEach((slide, i) => {

      slide.classList.toggle(
        'active',
        i === index
      );

    });


    productDots.forEach((dot, i) => {

      dot.classList.toggle(
        'active',
        i === index
      );

    });


    productIndex = index;
  }


  function nextProduct() {

    const nextIndex =
      (productIndex + 1) %
      productSlides.length;

    showProduct(nextIndex);
  }


  function prevProduct() {

    const prevIndex =
      (productIndex - 1 + productSlides.length) %
      productSlides.length;

    showProduct(prevIndex);
  }


  if (productNext) {
    productNext.addEventListener(
      'click',
      nextProduct
    );
  }


  if (productPrev) {
    productPrev.addEventListener(
      'click',
      prevProduct
    );
  }


  productDots.forEach((dot, index) => {

    dot.addEventListener('click', () => {

      showProduct(index);

    });

  });


  showProduct(0);


  /* SEARCH */

  const searchForm =
    document.querySelector('#searchForm');

  const searchInput =
    document.querySelector('#searchInput');

  const searchClear =
    document.querySelector('.search-clear');

  const searchInputWrap =
    document.querySelector('.search-input-wrap');

  const searchMessage =
    document.querySelector('#searchMessage');


  function updateSearchClear() {

    if (!searchInput || !searchInputWrap) {
      return;
    }

    if (searchInput.value.trim()) {

      searchInputWrap.classList.add('has-value');

    } else {

      searchInputWrap.classList.remove('has-value');

    }

  }


  function search() {

    if (!searchInput || !searchMessage) {
      return;
    }

    const keyword =
      searchInput.value.trim();


    if (!keyword) {

      searchInput.focus();

      searchMessage.textContent =
        '검색어를 입력해주세요.';

      searchMessage.classList.add('show');

      return;
    }


    searchMessage.textContent =
      `"${keyword}" 검색 결과를 준비하고 있습니다.`;

    searchMessage.classList.add('show');
  }


  if (searchInput) {

    searchInput.addEventListener(
      'input',
      () => {

        updateSearchClear();

        if (searchMessage) {
          searchMessage.classList.remove('show');
        }

      }
    );


    searchInput.addEventListener(
      'focus',
      () => {

        if (searchMessage) {
          searchMessage.classList.remove('show');
        }

      }
    );

  }


  if (searchClear) {

    searchClear.addEventListener(
      'click',
      () => {

        if (!searchInput) {
          return;
        }

        searchInput.value = '';

        updateSearchClear();

        searchInput.focus();

      }
    );

  }


  if (searchForm) {

    searchForm.addEventListener(
      'submit',
      event => {

        event.preventDefault();

        search();

      }
    );

  }


  updateSearchClear();


  /* COUPON MODAL */

  const couponModal =
    document.querySelector('#couponModal');

  const couponModalClose =
    document.querySelector('#couponModalClose');

  const couponModalBackdrop =
    document.querySelector('.coupon-modal-backdrop');

  const couponToday =
    document.querySelector('#couponToday');


  const couponStorageKey =
    'designbook_coupon_popup_hidden';


  function openCouponModal() {

    if (!couponModal) {
      return;
    }

    couponModal.classList.add('show');

    couponModal.setAttribute(
      'aria-hidden',
      'false'
    );

    document.body.classList.add('modal-open');

  }


  function closeCouponModal() {

    if (!couponModal) {
      return;
    }

    couponModal.classList.remove('show');

    couponModal.setAttribute(
      'aria-hidden',
      'true'
    );

    document.body.classList.remove('modal-open');

  }


  function hideCouponToday() {

    localStorage.setItem(
      couponStorageKey,
      'true'
    );

    closeCouponModal();

  }


  if (couponModalClose) {

    couponModalClose.addEventListener(
      'click',
      closeCouponModal
    );

  }


  if (couponModalBackdrop) {

    couponModalBackdrop.addEventListener(
      'click',
      closeCouponModal
    );

  }


  if (couponToday) {

    couponToday.addEventListener(
      'click',
      hideCouponToday
    );

  }


  document.addEventListener(
    'keydown',
    event => {

      if (
        event.key === 'Escape' &&
        couponModal &&
        couponModal.classList.contains('show')
      ) {

        closeCouponModal();

      }

    }
  );


  const popupHidden =
    localStorage.getItem(couponStorageKey);


  if (!popupHidden) {

    setTimeout(() => {

      openCouponModal();

    }, 700);

  }

});