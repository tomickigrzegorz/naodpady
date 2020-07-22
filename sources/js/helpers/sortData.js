// sortowanie danych
const sortData = (data, number) => {
  const dataSort =
    number === 7 // ostatni element RESET
      ? data.sort((a, b) => a.name.localeCompare(b.name))
      : data
        .filter((a) => a.type === number)
        .sort((a, b) => a.name.localeCompare(b.name));
  return dataSort;
};

export default sortData;
