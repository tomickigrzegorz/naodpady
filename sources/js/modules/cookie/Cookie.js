import { cookieInfo } from '../../helpers/data';
import { pureFadeIn, pureFadeOut } from '../FadeInOut';
import './Cookie.scss';

const purecookieDesc =
  'Strona korzysta z plików cookie w celu realizacji usług zgodnie z Polityką prywatności. Możesz określić warunki przechowywania lub dostępu do cookie w Twojej przeglądarce lub konfiguracji usługi... ';
const purecookieLink = '<a href="#" class="cookie--info">Polityka cookies</a>';
const purecookieButton = 'Rozumiem';

const setCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

const getCookie = name => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// const eraseCookie = name => {
//   document.cookie = `${name}=; Max-Age=-99999999;`;
// };

const purecookieDismiss = () => {
  setCookie('naOdpadyCookie', '1', 360);
  pureFadeOut('cookie--container');
};

const cookieConsent = () => {
  if (!getCookie('naOdpadyCookie')) {
    const template = `
    <div id="cookie--container" class="cookie--container">
      <div class="container--cookie">
        <div class="cookie--desc">${purecookieDesc} ${purecookieLink}</div>
        <div class="cookie--button"><p>${purecookieButton}</p></div>
      </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', template);
    pureFadeIn('cookie--container');
  }
};

const lightboxClose = () => {
  const info = document.querySelector('.active');
  const infoCookie = document.querySelector('.info--cookie');

  info.addEventListener('click', () => {
    document.body.classList.remove('active-info');
    pureFadeOut('info--cookie');
    setTimeout(() => {
      infoCookie.remove();
    }, 1000);
  });
};

const lightbox = () => {
  document.body.insertAdjacentHTML('beforeend', cookieInfo);
  document.body.classList.add('active-info');
  pureFadeIn('info--cookie');

  lightboxClose();
};

window.addEventListener('load', () => {
  cookieConsent();
  const button = document.querySelector('.cookie--button');
  const cookieinfo = document.querySelector('.cookie--info');
  button.addEventListener('click', purecookieDismiss);

  cookieinfo.addEventListener('click', lightbox);
});
