import '../scss/style.scss';

const trashlistJSON = process.env.TRASH_LIST;
const colors = ['brown', 'yellow', 'blue', 'green', 'gray', 'info'];
const trashFullName = [
  'BIO',
  'Metale i tworzywa sztuczne',
  'Papier',
  'Szkło',
  'Zmieszane',
  'RESET',
];

function sortData(data, number) {
  switch (number) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return data
        .filter(a => a.type === number)
        .sort((a, b) => a.name.localeCompare(b.name));
    default:
      return data.sort((a, b) => a.name.localeCompare(b.name));
  }
}

function infoTrash(number) {
  switch (number) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return '<div data-trash="6"><span>RESET</span> wraca do ustawień początkowych</div>';
    default:
      return 'cała lista śmieci';
  }
}

function setFocusSearch() {
  const searchInput = document.getElementById('search');
  console.log('ok');
  searchInput.focus();
}

function showHideNoResult() {
  const noResult = document.querySelector('.no__result');
  const rowVisibleCount = document.querySelectorAll(
    '.row:not([style="display: none;"])'
  ).length;

  return rowVisibleCount < 1
    ? noResult.classList.remove('hidden')
    : noResult.classList.add('hidden');
}

function hideNoResult() {
  const noResult = document.querySelector('.no__result');
  noResult.classList.add('hidden');
}

function getDataFromJSON(number) {
  const numberType = number ? Number(number) : 6;
  const container = document.querySelector('.list__trash');
  const typeTrash = document.querySelector('.type__trash');
  const divBlock = document.createElement('div');
  divBlock.classList.add('container__list');
  container.appendChild(divBlock);

  document.body.classList.add('loading', `color-${colors[numberType - 1]}`);

  document.getElementById('search').value = '';

  hideNoResult();

  fetch(`./trashlist/${trashlistJSON}`)
    .then(response => response.json())
    .then(json => sortData(json.segregacja.odpadow, numberType))
    .then(site => {
      return new Promise(resolve => {
        setTimeout(() => {
          site.map(({ name, type }) => {
            const nameTrash = `
              <div class="gradient__row gradient-${colors[type - 1]}">
                <div class="title">${name}</div>
              </div>`;

            const row = `
              <div class="row">
                ${nameTrash}
              </div>`;

            divBlock.innerHTML += row;
            return divBlock;
          });
          document.body.className = '';
          resolve();
        }, 500);
      });
    });

  typeTrash.innerHTML = infoTrash(numberType);
  setFocusSearch();
  tilesWithContainerNames();
}

function scrollTopWindow() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

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

function addMailAddress() {
  const noResult = document.querySelectorAll('.no__result--mail');
  for (let i = 0; i < noResult.length; i++) {
    noResult[i].innerHTML =
      '<a href="mailto:info@naodpady.pl">info@naodpady.pl</a>';
  }
}

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

function triggerBottomMenu() {
  const triggerElement = document.querySelector('.trigger');
  const footer = document.querySelector('.color-of__containers');

  triggerElement.addEventListener('click', () => {
    footer.classList.toggle('active');
  });
}

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
  // addingTriggerButton();
  downloadDataByColor();
}

function navigationMenu() {
  const toggler = document.querySelector('.menu__toggler');
  const menu = document.querySelector('.menu');

  toggler.addEventListener('click', () => {
    toggler.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('active-menu');
  });
}

window.addEventListener('input', searchText);
window.addEventListener('load', () => {
  addingTriggerButton();
  getDataFromJSON();
  addMailAddress();
  navigationMenu();
});
