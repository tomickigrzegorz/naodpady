// zwraca tekst który umieszczany jest pod inputem

const InfoTrash = number => {
  const typeTrash = document.querySelector('.type__trash');
  const infoText =
    number === 7
      ? 'cała lista śmieci'
      : '<div data-trash="7"><span>RESET</span> początkowa lista</div>';
  typeTrash.innerHTML = infoText;
};

export default InfoTrash;
