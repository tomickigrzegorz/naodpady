import '../scss/style.scss';

const trashlistJSON = process.env.TRASH_LIST;
const colors = ["brown", "yellow", "blue", "green", "gray", "info"];
const trashFullName = ["BIO", "Metale i tworzywa sztuczne", "Papier", "Szkło", "Zmieszane", "RESET"];


function sortData(data, type) {
  switch (type) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return data.filter(a => a.type === type).sort((a, b) => a.name.localeCompare(b.name));
    default:
      return data.sort((a, b) => a.name.localeCompare(b.name));
  }
}

// console.log(sortData(json.segregacja.odpadow, type))
function allsite(type) {
  const container = document.querySelector('.list-trash');
  const divBlock = document.createElement('div');
  divBlock.classList.add('container-list')
  container.append(divBlock);

  fetch(`./trashlist/${trashlistJSON}`)
    .then(response => response.json())
    .then(json => sortData(json.segregacja.odpadow, Number(type)))
    .then(site => {
      site.map(({ name, type }, index) => {
        const _name = `
          <div class="gradient-${colors[type - 1]}">
            <div class="title">${name}</div>
          </div>`;

        const row = `
          <div class="row">
            ${_name}
          </div>
        `
        divBlock.innerHTML += row;
      })
    })

  tilesWithContainerNames();

}

function searchText() {
  const input = document.getElementById('search');
  const filter = input.value.toUpperCase();
  const content = document.querySelector('.container-list');
  const lists = content.querySelectorAll('.title');

  for (let i = 0; i < lists.length; i++) {
    const item = lists[i].textContent;
    if (item.toUpperCase().indexOf(filter) > -1) {
      lists[i].parentNode.parentNode.style.display = ''
    } else {
      lists[i].parentNode.parentNode.style.display = 'none'
    }
  }
};

function tilesWithContainerNames() {
  const footer = document.querySelector('.color-of-containers');

  colors.forEach((color, index) => {
    const colorElement = colors[index];
    const column = `
      <div class="color-trash ${colorElement}" data-trash="${index + 1}">${trashFullName[index]}</div>
    `
    footer.innerHTML += column;
  })

  downloadDataByColor();
}

function downloadDataByColor() {
  const dataTrashs = document.querySelectorAll('[data-trash]');
  const footer = document.querySelector('.color-of-containers');
  const content = document.querySelector('.container-list');

  dataTrashs.forEach(dataTrash => {
    dataTrash.addEventListener('click', event => {
      footer.innerHTML = '';
      content.remove();
      const dataType = dataTrash.dataset.trash;
      allsite(dataType)
    })
  })
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

window.addEventListener('keyup', searchText);
window.addEventListener('DOMContentLoaded', allsite);