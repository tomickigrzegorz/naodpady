const socialBoxs = document.querySelectorAll('.social-buttons');

const template = () => {
  const socialPlace = `
    <div class="icon" title="Udostępnij w serwisie Facebook" data-share="facebook">
      <svg class="svg-icon">
        <use xlink:href="#facebook-icon"></use>
      </svg>
    </div>
    <div class="icon" title="Udostępnij w serwisie Twitter" data-share="twitter">
      <svg class="svg-icon">
        <use xlink:href="#twitter-icon"></use>
      </svg>
    </div>
    <div class="icon" title="Wyślij maila" data-share="mail">
      <svg class="svg-icon">
        <use xlink:href="#mail-icon"></use>
      </svg>
    </div>
  `;
  return socialPlace;
};

const shareData = {
  title: 'naOdpady - Jak segregować śmieci? Polityka prywatności.',
  text:
    '🗑 Jak segregować śmieci? Co gdzie wrzucać? Pojemniki BIO, Metale i tworzywa sztuczne, papier, szkło, zmieszane.',
  url: 'https://naodpady.pl',
};

const shareButton = () => {
  const share = `
    <div class="share">
      <svg class="svg-icon">
        <use xlink:href="#share-icon"></use>
      </svg>
    </div>
  `;

  return share;
};

socialBoxs.forEach(socialbox => {
  // socialbox.innerHTML = shareButton();
  socialbox.innerHTML = navigator.share
    ? shareButton()
    : template(socialbox.dataset);

  if (navigator.share) {
    const btn = document.querySelector('.share');
    btn.addEventListener('click', async () => {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log(err);
      }
    });
  }
});

const showShareLink = (typeSocial, url, title) => {
  let urlLink;
  switch (typeSocial) {
    case 'facebook':
      urlLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(
        url
      )}&p=${encodeURI(title)}`;
      break;
    case 'twitter':
      urlLink = `http://twitter.com/share?text=${title}&url=${url}`;
      break;
    default:
      break;
  }
  return urlLink;
};

// window.addEventListener('DOMContentLoaded', () => {
const socialIcons = document.querySelectorAll('div[data-share]');

const winWidth = 520;
const winHeight = 320;
const winTop = window.screen.height / 2 - winHeight / 2;
const winLeft = window.screen.width / 2 - winWidth / 2;

socialIcons.forEach(socialicon => {
  socialicon.addEventListener('click', e => {
    const target = e.currentTarget;
    const typeSocial = target.dataset.share;
    // const { url, title } = target.parentNode.dataset;
    const { title } = document;
    const url = window.location.href;
    switch (typeSocial) {
      case 'mail': {
        const mailToLink = `mailto:?subject=Zobacz może Ci się spodoba&body=${title} %20%0A ${url}`;
        const win = window.open(mailToLink, 'mail');
        setTimeout(() => {
          win.close();
        }, 500);
        break;
      }
      default: {
        window.open(
          showShareLink(typeSocial, url, title),
          'sharer',
          `top=${winTop}, left=${winLeft}, toolbar=0, status=0, width=${winWidth}, height=${winHeight}`
        );
        break;
      }
    }
  });
});
