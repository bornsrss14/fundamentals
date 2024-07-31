'use strict';

/////////////////////////////////////// DOM ELEMENT SELECTION

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btn_scrollTo = document.querySelector('.btn--scroll-to');
const section_one = document.getElementById('section--1');
const slides = document.querySelectorAll('.slide');
const sliderEntero = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');
const dots = document.querySelectorAll('.dots__dot');
const linksContainer = document.querySelector('.nav__links');
const containerTabs = document.querySelector('.operations__tab-container');
const allTabs = document.querySelectorAll('.operations__tab');

/* FUNCIONES GENERALES */
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/* 1. Smooth Scroll  */
const funSmoothScroll = function (e) {
  const coordenadas = section_one.getBoundingClientRect();
  window.scrollTo({
    left: coordenadas.left + window.pageXOffset,
    top: coordenadas.top + window.pageYOffset,
    behavior: 'smooth',
  });
};

const smoothLinks = function (eve) {
  /* matching strategy */
  if (eve.target.classList.contains('nav__link')) {
    eve.preventDefault();
    const id = eve.target.getAttribute('href');
    const section = document.querySelector(id);
    if (section) {
      const coordenadas = section.getBoundingClientRect();
      window.scrollTo({
        left: coordenadas.left + window.pageXOffset,
        top: coordenadas.top + window.pageYOffset,
        behavior: 'smooth',
      });
      // document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  }
};

const funTabsInter = function (eve) {
  const clicked = eve.target.closest('.operations__tab');
  if (!clicked) return;
  allTabs.forEach(tab => {
    tab.classList.remove('operations__tab--active');
  });
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
};

const funCreateDots = function () {
  slides.forEach(function (_, index) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};
funCreateDots();

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activateDot(0);

const funDotClick = function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
};

/*F. Slider */

let currentSlide = 0;
const maxSlides = slides.length;

const goToSlide = function (slide) {
  slides.forEach(
    (s, index) => (s.style.transform = `translateX(${100 * (index - slide)}%)`)
  );
};
goToSlide(0);

const funNextSlide = function () {
  if (currentSlide === maxSlides - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
}; /* currentSlide = 1:  -100 , 0 , 100 , 200 , and do far and so on */

const funPreviousSlide = function () {
  currentSlide === 0 ? (currentSlide = maxSlides - 1) : currentSlide--;
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

/* EVENT LISTENERS BUTTONS */
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
btn_scrollTo.addEventListener('click', funSmoothScroll);
btnRight.addEventListener('click', funNextSlide);
btnLeft.addEventListener('click', funPreviousSlide);
dotsContainer.addEventListener('click', funDotClick);
document.addEventListener('keydown', function (ev) {
  if (ev.key === 'ArrowLeft') {
    funPreviousSlide();
  }
  if (ev.key === 'ArrowRight') {
    funNextSlide();
  }
});
linksContainer.addEventListener('click', smoothLinks);
containerTabs.addEventListener('click', funTabsInter);
