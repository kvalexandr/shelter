// json

let fullPetsList = [];

document.addEventListener('DOMContentLoaded', getJsonPets);

async function getJsonPets() {
  await fetch('../../json/pets.json')
    .then(response => {
      return response.json();
    })
    .then(pets => {

      fullPetsList = (() => {
        let tempArr = [];

        for (let i = 0; i < 6; i++) {
          const newPets = pets;

          for (let j = pets.length; j > 0; j--) {
            let randInd = Math.floor(Math.random() * j);
            const randElem = newPets.splice(randInd, 1)[0];
            newPets.push(randElem);
          }

          tempArr = [...tempArr, ...newPets];
        }
        return tempArr;
      })();

      fullPetsList = sort863(fullPetsList);
      createPets(fullPetsList);

      $('.slider-list').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });

      $('.slider-btn-prev').on('click', function () {
        $('.slider-list').slick('slickPrev');
      });

      $('.slider-btn-next').on('click', function () {
        $('.slider-list').slick('slickNext');
      });

      const petsItems = document.querySelectorAll('.slider-item');
      const petImg = document.querySelector('#pet_img');
      const petName = document.querySelector('#pet_name');
      const petType = document.querySelector('#pet_type');
      const petDescription = document.querySelector('#pet_description');
      const petAge = document.querySelector('#pet_age');
      const petInoculations = document.querySelector('#pet_inoculations');
      const petDiseases = document.querySelector('#pet_diseases');
      const petParasites = document.querySelector('#pet_parasites');
      if (petsItems) {
        petsItems.forEach(petsItem => {
          petsItem.addEventListener('click', (e) => {
            for (let pet of pets) {
              if (pet.id == e.currentTarget.getAttribute('data-id')) {
                petImg.innerHTML = `<img src="${pet.img}" alt="${pet.name}">`;
                petName.innerHTML = pet.name;
                petType.innerHTML = `${pet.type} - ${pet.breed}`;
                petDescription.innerHTML = pet.description;
                petAge.innerHTML = pet.age;
                petInoculations.innerHTML = pet.inoculations;
                petDiseases.innerHTML = pet.diseases;
                petParasites.innerHTML = pet.parasites;
              }
            }
            openModal();
          });
        });
      }

    });
}

const createPets = (petsList) => {
  const elem = document.querySelector(".slider-list");
  elem.innerHTML += createElements(petsList);
}

const createElements = (petsList) => {
  let html = '';
  for (let i = 0; i < petsList.length; i++) {
    html += `
      <div class="slider-item" data-id="${petsList[i].id}">
        <img class="slider-item__img" src="${petsList[i].img}" alt="">
        <div class="slider-item__title">${petsList[i].name}</div>
        <button class="btn btn-border slider-item__btn">Learn more</button>
      </div>
    `;
  }
  return html;
}

const sort863 = (list) => {
  let unique8List = [];
  let length = list.length;
  for (let i = 0; i < length / 8; i++) {
    const uniqueStepList = [];
    for (j = 0; j < list.length; j++) {
      if (uniqueStepList.length >= 8) {
        break;
      }
      const isUnique = !uniqueStepList.some((item) => {
        return item.name === list[j].name;
      });
      if (isUnique) {
        uniqueStepList.push(list[j]);
        list.splice(j, 1);
        j--;
      }
    }
    unique8List = [...unique8List, ...uniqueStepList];
  }
  list = unique8List;


  list = sort6recursively(list);

  return list;
}

const sort6recursively = (list) => {
  const length = list.length;

  for (let i = 0; i < (length / 6); i++) {
    const stepList = list.slice(i * 6, (i * 6) + 6);

    for (let j = 0; j < 6; j++) {
      const duplicatedItem = stepList.find((item, ind) => {
        return item.name === stepList[j].name && (ind !== j);
      });

      if (duplicatedItem !== undefined) {
        const ind = (i * 6) + j;
        const which8OfList = Math.trunc(ind / 8);

        list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

        sort6recursively(list);
      }
    }
  }

  return list;
}

// modal 

const modal = document.querySelector('.modal');
const overlayModal = document.querySelector('.overlay-modal');
const closeBtnModal = document.querySelector('.modal__close');

const openModal = () => {
  modal.classList.toggle('active');
  overlayModal.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
};

const closeModal = () => {
  modal.classList.toggle('active');
  overlayModal.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
};

overlayModal.addEventListener('click', closeModal);
closeBtnModal.addEventListener('click', closeModal);

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

// active link

const activeLink = document.querySelector('.menu__link.active');
activeLink.addEventListener('click', (e) => {
  e.preventDefault();

  document.body.scrollIntoView({
    block: 'start',
    behavior: 'smooth',
  });

  disableMenu();
});
