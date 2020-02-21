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

export default NavigationMenu;
