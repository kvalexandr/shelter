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

      document.querySelector('.pagination-num').innerText = (numPage + 1).toString();

      const petsItems = document.querySelectorAll('.pets-item');
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
  const elem = document.querySelector(".pets-list");
  elem.innerHTML += createElements(petsList);
}

const createElements = (petsList) => {
  let html = '';
  for (let i = 0; i < petsList.length; i++) {
    html += `
      <div class="pets-item" data-id="${petsList[i].id}">
        <img class="pets-item__img" src="${petsList[i].img}" alt="">
        <div class="pets-item__title">${petsList[i].name}</div>
        <button class="btn btn-border pets-item__btn">Learn more</button>
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

let numPage = 0;
const firstPage = document.querySelector("#firstPage");
const prevPage = document.querySelector("#prevPage");
const nextPage = document.querySelector("#nextPage");
const lastPage = document.querySelector("#lastPage");
const currentPage = document.querySelector("#currentPage");
const wrapperPets = document.querySelector(".pets-list");

let topOffset = 930;
let itemsPerPage = 8;
const checkTopOffset = () => {
  if (document.querySelector("body").offsetWidth < 1280) {
    topOffset = 1395;
  }
  if (document.querySelector("body").offsetWidth > 768 && document.querySelector("body").offsetWidth < 1280) {
    itemsPerPage = 6;
  }
  if (document.querySelector("body").offsetWidth < 768) {
    itemsPerPage = 3;
  }
}

const checkPage = () => {
  if (numPage === 0) {
    firstPage.classList.add('disable-page');
    prevPage.classList.add('disable-page');
    firstPage.disabled = true;
    prevPage.disabled = true;
  } else {
    firstPage.classList.remove('disable-page');
    prevPage.classList.remove('disable-page');
    firstPage.disabled = false;
    prevPage.disabled = false;
  }

  if (numPage == fullPetsList.length / itemsPerPage - 1) {
    lastPage.classList.add('disable-page');
    nextPage.classList.add('disable-page');
    lastPage.disabled = true;
    nextPage.disabled = true;
  } else {
    lastPage.classList.remove('disable-page');
    nextPage.classList.remove('disable-page');
    lastPage.disabled = false;
    nextPage.disabled = false;
  }
}

checkTopOffset();
checkPage();

prevPage.addEventListener('click', (e) => {
  if (numPage > 0) {
    numPage--;
    console.log(numPage + 1);
  }

  wrapperPets.style.top = `-${topOffset * numPage}px`;
  currentPage.innerText = (numPage + 1).toString();

  checkPage();
});

firstPage.addEventListener('click', (e) => {
  numPage = 0;
  wrapperPets.style.top = `-${topOffset * numPage}px`;
  currentPage.innerText = (numPage + 1).toString();

  checkPage();
});

nextPage.addEventListener('click', (e) => {
  if (numPage < (wrapperPets.offsetHeight / topOffset) - 1) {
    numPage++;
    console.log(numPage + 1);
  }

  wrapperPets.style.top = `-${topOffset * numPage}px`;
  currentPage.innerText = (numPage + 1).toString();

  checkPage();
});

lastPage.addEventListener('click', (e) => {
  numPage = fullPetsList.length / itemsPerPage - 1;
  wrapperPets.style.top = `-${topOffset * numPage}px`;
  currentPage.innerText = (numPage + 1).toString();

  checkPage();
});

window.addEventListener('resize', (e) => {
  checkTopOffset();
  checkPage();
  numPage = 0;
  wrapperPets.style.top = `-${topOffset * numPage}px`;
  currentPage.innerText = (numPage + 1).toString();
});

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

