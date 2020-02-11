// kolory
const colors = ['brown', 'yellow', 'blue', 'green', 'gray', 'other', 'info'];

// tekst na dole
const trashFullName = [
  'BIO',
  'Metale i tworzywa sztuczne',
  'Papier',
  'Szkło',
  'Zmieszane',
  'Inne',
  'RESET',
];

// sciezka do json - listy smieci
const trashlistJSON = `./trashlist/${process.env.TRASH_LIST}`;

export { colors, trashFullName, trashlistJSON };
