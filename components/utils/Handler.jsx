export function ProjCategoryClicked(e,btnClassCard,focusClass,setProjCard,projectItem) {
  e.preventDefault();
  const cardId = e.currentTarget.id
  const categoryCard = document.querySelectorAll('.' + btnClassCard);
  const currentCard = document.querySelector('#' + cardId);

  //Reset all Card status
  categoryCard.forEach(btn => {
    btn.classList.remove(focusClass)
    btn.querySelector('span#black-icon').removeAttribute('style');
    btn.querySelector('span#white-icon').style.display = 'none';
    btn.querySelector('div[data-arrow=categoryArrow]').style.display = 'none';
  })

  //Set selected card status
  currentCard.classList.add(focusClass);
  currentCard.querySelector('span#black-icon').style.display = 'none';
  currentCard.querySelector('span#white-icon').removeAttribute('style');
  currentCard.querySelector('div[data-arrow=categoryArrow]').style.display = '';

  //set Project Card to current Selected Category
  setProjCard(projectItem[cardId])
}

export function generateRandom(tokenLength) {
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < tokenLength; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
   return result;
}