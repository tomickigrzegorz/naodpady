import { Workbox } from 'workbox-window';

import '../scss/style.scss';

import {
  AddingTriggerButton,
  TilesWithContainerNames,
} from './modules/FooterMenu';

import Accordion from './modules/accordion/accordion';
import AddMailAddress from './modules/AddMailAddress';
import InfoTrash from './modules/InfoTrash';
import RenderRow from './modules/RenderRow';
import Loading from './modules/Loading';
import ShowHideNoResult from './modules/NoResults';

// pobranie danych z JSON i ich wyświetlenie
const GetDataFromJSON = number => {
  const numberType = number ? +number : 7;
  const container = document.querySelector('.list__trash');
  const div = document.createElement('div');

  document.getElementById('search').value = '';

  div.classList.add('container__list');
  container.appendChild(div);

  // loading animation
  Loading();

  // pokazujemy/ukrywamy noresult brak wynikow
  ShowHideNoResult('remove');

  // render wszystki rekordow
  RenderRow(div, numberType);

  // informacja pod inputem
  InfoTrash(numberType);

  // dolne kolorowe menu
  TilesWithContainerNames();

  // eslint-disable-next-line no-use-before-define
  DownloadDataByColor();
};

// utrzymanie wyników zawsze na górze
const ScrollTopWindow = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

// pokazywanie/uktrywanie rekordów po wpisaniu tekstu
const SearchText = () => {
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
  ShowHideNoResult();
  ScrollTopWindow();
};

// ladowanie nowych danych po kliknieciu [data-trash]
const DownloadDataByColor = () => {
  const dataTrashs = document.querySelectorAll('[data-trash]');
  const footer = document.querySelector('.color-of__containers');
  const content = document.querySelector('.container__list');

  for (let i = 0; i < dataTrashs.length; i++) {
    dataTrashs[i].addEventListener('click', event => {
      const dataType = event.currentTarget.dataset.trash;
      footer.innerHTML = '';
      content.remove();
      GetDataFromJSON(dataType);
    });
  }
};

// pokazuje/ukrywa informacje
const NavigationMenu = () => {
  const toggler = document.querySelector('.menu__toggler');
  const menu = document.querySelector('.menu');

  toggler.addEventListener('click', () => {
    toggler.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('active-info');
  });
};

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
}

window.addEventListener('DOMContentLoaded', () => {
  AddingTriggerButton();
  GetDataFromJSON();
  AddMailAddress();
  NavigationMenu();

  // eslint-disable-next-line no-new
  new Accordion({
    accordionName: 'accordion-element',
    activeName: 'active',
    panelName: 'panel',
    type: false,
  });
});

window.addEventListener('input', SearchText);
