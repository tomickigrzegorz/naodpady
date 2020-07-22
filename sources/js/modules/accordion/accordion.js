import './accordion.scss';

class Accordion {
  constructor(options) {
    this.type = options.type;
    this.activeName = options.activeName;
    this.panelName = options.panelName;
    this.accordionName = options.accordionName;

    this.creatAccordion();
  }

  creatAccordion() {
    const acc = this.getAccordionName();

    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', (e) => {
        if (this.type === true && !this.hasClass(acc[i], this.activeName)) {
          this.removeActiveAndPanelHeight();
        }

        e.target.classList.toggle(this.activeName);
        const panel = e.target.nextElementSibling;

        panel.style.maxHeight = panel.style.maxHeight
          ? null
          : `${panel.scrollHeight}px`;
      });
    }
  }

  getAccordionName() {
    return document.getElementsByClassName(this.accordionName);
  }

  hasClass(element, cla) {
    // console.log(element.className, cla);
    return element.classList.contains(cla);
  }

  removeActiveAndPanelHeight() {
    const currentActive = document.querySelectorAll(
      `.${this.accordionName} > .${this.activeName}`
    );

    const heightPanel = document.querySelectorAll(
      `.${this.accordionName} > .${this.panelName}`
    );

    for (let c = 0; c < currentActive.length; c++) {
      currentActive[c].classList.remove(this.activeName);
    }

    for (let h = 0; h < heightPanel.length; h++) {
      heightPanel[h].removeAttribute('style');
    }
  }
}

export default Accordion;
