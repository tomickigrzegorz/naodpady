const pureFadeIn = (elem, display) => {
  const el = document.getElementById(elem);
  el.style.opacity = 0;
  el.style.display = display || 'block';

  (function fade() {
    let val = parseFloat(el.style.opacity);
    // eslint-disable-next-line no-cond-assign
    if (!((val += 0.02) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
};

const pureFadeOut = elem => {
  const el = document.getElementById(elem);
  el.style.opacity = 1;

  (function fade() {
    // eslint-disable-next-line no-cond-assign
    if ((el.style.opacity -= 0.02) < 0) {
      el.style.display = 'none';
    } else {
      requestAnimationFrame(fade);
    }
  })();
};

export { pureFadeIn, pureFadeOut };
