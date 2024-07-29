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

const funSmoothScroll = function (e) {};

/*F. Slider */

let currentSlide = 0;
const maxSlides = slides.length;
const goToSlide = function (slide) {
  slides.forEach(
    (s, index) => (s.style.transform = `translateX(${100 * (index - slide)}%)`)
  );
};
slides.forEach(
  (s, index) => (s.style.transform = `translateX(${100 * index}%)`)
);
goToSlide(0);

const funNextSlide = function () {
  if (currentSlide === maxSlides - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
}; /* currentSlide = 1:  -100 , 0 , 100 , 200 , and do far and so on */

const funPreviousSlide = function () {
  currentSlide === 0 ? (currentSlide = maxSlides - 1) : currentSlide--;
  goToSlide(currentSlide);
};

/* EVENT LISTENERS BUTTONS */
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
btn_scrollTo.addEventListener('click', funSmoothScroll);
btnRight.addEventListener('click', funNextSlide);
btnLeft.addEventListener('click', funPreviousSlide);
