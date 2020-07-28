// show / hide no result section
const ShowHideNoResult = (action) => {
  const noResult = document.querySelector('.no__result');
  const rowVisibleCount = document.querySelectorAll(
    '.row:not([style="display: none;"]'
  );

  if (action === 'remove') {
    return noResult.classList.add('hidden');
  }
  return rowVisibleCount.length < 1
    ? noResult.classList.remove('hidden')
    : noResult.classList.add('hidden');
};

export default ShowHideNoResult;
