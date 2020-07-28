import { colors, trashFullName } from '../helpers/data';

// generating records
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

// adds / removes a class in body
const TriggerBottomMenu = () => {
  const triggerElement = document.querySelector('.trigger');

  triggerElement.addEventListener('click', () => {
    document.body.classList.toggle('active-menu');
  });
};

// button shows / hides the bottom menu
const AddingTriggerButton = () => {
  const triggerButton = document.createElement('div');
  triggerButton.setAttribute('class', 'trigger');
  triggerButton.setAttribute('id', 'trigger');
  const firstMenuFooter = document.querySelector('.color-of__containers');
  const parentElement = firstMenuFooter.parentNode;
  parentElement.insertBefore(triggerButton, firstMenuFooter);

  TriggerBottomMenu();
};

export { TilesWithContainerNames, AddingTriggerButton };
