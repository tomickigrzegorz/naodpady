import { colors, trashFullName } from '../helpers/data';

// generowanie rekordow
const TilesWithContainerNames = () => {
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
};

// dodaje/usuwa klasę w body
const TriggerBottomMenu = () => {
  const triggerElement = document.querySelector('.trigger');

  triggerElement.addEventListener('click', () => {
    document.body.classList.toggle('active-menu');
  });
};

// button pokazuje/ukrywa bottom menu
const AddingTriggerButton = () => {
  const triggerButton = document.createElement('div');
  triggerButton.setAttribute('class', 'trigger');
  triggerButton.setAttribute('id', 'trigger');
  const firstElementMenuFooter = document.querySelector(
    '.color-of__containers'
  );
  const parentElement = firstElementMenuFooter.parentNode;
  parentElement.insertBefore(triggerButton, firstElementMenuFooter);

  TriggerBottomMenu();
};

export { TilesWithContainerNames, AddingTriggerButton };
