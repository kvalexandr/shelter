// json

const pets = [];
const fullPetsList = [];

const request = new XMLHttpRequest();
request.open('GET', '../../json/pets.json');
request.onload = () => {
  console.log(request.response);
};
request.send();

// menu

const overlay = document.querySelector('.overlay');
const headerWrapper = document.querySelector('.header-wrapper');
const burgerMenu = document.querySelector('.header__burger-menu');
const navMenu = document.querySelector('.nav-menu');

const viewMenu = () => {
  headerWrapper.classList.toggle('active');
  burgerMenu.classList.toggle('active');
  navMenu.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
}

const disableMenu = () => {
  headerWrapper.classList.remove('active');
  burgerMenu.classList.remove('active');
  navMenu.classList.remove('active');
  overlay.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

burgerMenu.addEventListener('click', viewMenu);
overlay.addEventListener('click', disableMenu);

window.addEventListener('resize', (e) => {
  if (e.target.innerWidth > 767) {
    disableMenu();
  }
});
