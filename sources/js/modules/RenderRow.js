import { colors, trashlistJSON } from '../helpers/data';
import sortData from '../helpers/sortData';
import fetchData from '../helpers/fetchData';

const RenderRow = (div, numberType) => {
  const fragment = document.createDocumentFragment();
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

            return fragment.appendChild(row);
          });
          // console.timeLog('answer time');
          document.body.classList.remove('loading');
          div.appendChild(fragment);
          resolve();
        }, 500);
        // console.timeEnd('answer time');
      });
    });
};

export default RenderRow;
