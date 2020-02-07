import { Workbox } from 'workbox-window';
import Accordion from './modules/accordion/accordion';
import '../scss/style.scss';

const trashlistJSON = `./trashlist/${process.env.TRASH_LIST}`;
const colors = ['brown', 'yellow', 'blue', 'green', 'gray', 'other', 'info'];
const trashFullName = [
  'BIO',
  'Metale i tworzywa sztuczne',
  'Papier',
  'Szkło',
  'Zmieszane',
  'Inne',
  'RESET',
];

// sortowanie danych
function sortData(data, number) {
  const dataSort =
    number === 7
      ? data.sort((a, b) => a.name.localeCompare(b.name))
      : data
          .filter(a => a.type === number)
          .sort((a, b) => a.name.localeCompare(b.name));
  return dataSort;
}

// zwraca tekst który umieszczany jest pod inputem
function infoTrash(number) {
  const infoText =
    number === 7
      ? 'cała lista śmieci'
      : '<div data-trash="7"><span>RESET</span> początkowa lista</div>';
  return infoText;
}

// pokaż/ukryj sekcję no result
function showHideNoResult() {
  const noResult = document.querySelector('.no__result');
  const rowVisibleCount = document.querySelectorAll(
    '.row:not([style="display: none;"])'
  ).length;

  return rowVisibleCount < 1
    ? noResult.classList.remove('hidden')
    : noResult.classList.add('hidden');
}

// ukrycie elementu przy wybraniu bottom menu
function hideNoResult() {
  const noResult = document.querySelector('.no__result');
  noResult.classList.add('hidden');
}

// fetch data JSON
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// pobranie danych z JSON i ich wyświetlenie
function getDataFromJSON(number) {
  const numberType = number ? +number : 7;
  const container = document.querySelector('.list__trash');
  const typeTrash = document.querySelector('.type__trash');
  const fragment = document.createDocumentFragment();
  const divBlock = document.createElement('div');
  divBlock.classList.add('container__list');
  container.appendChild(divBlock);

  document.body.className = '';
  document.body.classList.add('loading', `color-${colors[numberType - 1]}`);

  document.getElementById('search').value = '';

  hideNoResult();

  fetchData(trashlistJSON)
    .then(json => sortData(json.segregacja.odpadow, numberType))
    .then(site => {
      return new Promise(resolve => {
        // console.time('answer time');
        setTimeout(() => {
          site.map(({ name, type }) => {
            const color = type === 0 ? 'other' : colors[type - 1];
            const row = document.createElement('div');
            row.classList.add('row');
            row.innerHTML = `
              <div class="gradient__row gradient-${color}">
                <div class="title">${name}</div>
              </div>`;

            fragment.appendChild(row);
            // return divBlock;
          });
          // console.timeLog('answer time');
          document.body.classList.remove('loading');
          divBlock.appendChild(fragment);
          resolve();
        }, 500);
        // console.timeEnd('answer time');
      });
    });

  typeTrash.innerHTML = infoTrash(numberType);
  tilesWithContainerNames();
}

// utrzymanie wyników zawsze na górze
function scrollTopWindow() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

// pokazywanie/uktrywanie rekordów po wpisaniu tekstu
function searchText() {
  const input = document.getElementById('search');
  const filter = input.value.toUpperCase();
  const content = document.querySelector('.container__list');
  const lists = content.querySelectorAll('.title');

  for (let i = 0; i < lists.length; i++) {
    const item = lists[i].textContent;
    if (item.toUpperCase().indexOf(filter) > -1) {
      lists[i].parentNode.parentNode.style.display = '';
    } else {
      lists[i].parentNode.parentNode.style.display = 'none';
    }
  }

  showHideNoResult();
  scrollTopWindow();
}

// dodanie adresu email
function addMailAddress() {
  const noResult = document.querySelectorAll('.email');
  for (let i = 0; i < noResult.length; i++) {
    noResult[i].innerHTML =
      '<a href="mailto:info@naodpady.pl">info@naodpady.pl</a>';
  }
}

// ladowanie nowych danych po kliknieciu [data-trash]
function downloadDataByColor() {
  const dataTrashs = document.querySelectorAll('[data-trash]');
  const footer = document.querySelector('.color-of__containers');
  const content = document.querySelector('.container__list');

  for (let i = 0; i < dataTrashs.length; i++) {
    dataTrashs[i].addEventListener('click', event => {
      const dataType = event.currentTarget.dataset.trash;
      footer.innerHTML = '';
      content.remove();
      getDataFromJSON(dataType);
    });
  }
}

// dodaje/usuwa klasę w body
function triggerBottomMenu() {
  const triggerElement = document.querySelector('.trigger');

  triggerElement.addEventListener('click', () => {
    document.body.classList.toggle('active-menu');
  });
}

// button pokazuje/ukrywa bottom menu
function addingTriggerButton() {
  const triggerButton = document.createElement('div');
  triggerButton.setAttribute('class', 'trigger');
  const firstElementMenuFooter = document.querySelector(
    '.color-of__containers'
  );
  const parentElement = firstElementMenuFooter.parentNode;
  parentElement.insertBefore(triggerButton, firstElementMenuFooter);

  triggerBottomMenu();
}

// generowanie rekordow
function tilesWithContainerNames() {
  const footer = document.querySelector('.color-of__containers');

  for (let i = 0; i < colors.length; i++) {
    const colorElement = colors[i];
    const column = `
      <div class="color__trash ${colorElement}" data-trash="${i + 1}">
        ${trashFullName[i]}
      </div>
    `;
    footer.innerHTML += column;
  }
  downloadDataByColor();
}

// pokazuje/ukrywa informacje
function navigationMenu() {
  const toggler = document.querySelector('.menu__toggler');
  const menu = document.querySelector('.menu');

  toggler.addEventListener('click', () => {
    toggler.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('active-info');
  });
}

// uruchamiamy servive-worker
if ('serviceWorker' in navigator) {
  const wb = new Workbox('/service-worker.js');

  wb.addEventListener('installed', event => {
    if (event.isUpdate) {
      if (
        confirm('Dostępna jest nowa treść!. Kliknij przycisk OK, aby odświeżyć')
      ) {
        window.location.reload();
      }
    }
  });

  wb.register();
  // window.addEventListener('load', () => {
  //   navigator.serviceWorker.register('/service-worker.js');
  // });
}

window.addEventListener('DOMContentLoaded', () => {
  addingTriggerButton();
  getDataFromJSON();
  addMailAddress();
  navigationMenu();

  const accordion = new Accordion({
    accordionName: 'accordion-element',
    activeName: 'active',
    panelName: 'panel',
    type: false,
  });

  window.addEventListener('input', searchText);
});
