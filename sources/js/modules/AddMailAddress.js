// dodanie adresu email
const AddMailAddress = () => {
  const mail = process.env.TRASH_MAIL;
  const noResult = document.querySelectorAll('.email');
  for (let i = 0; i < noResult.length; i++) {
    noResult[i].innerHTML = `<a href="mailto:${mail}">${mail}</a>`;
  }
};

export default AddMailAddress;
