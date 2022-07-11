export function ProjCategoryClicked(e,btnClassCard,focusClass) {
  e.preventDefault();
  const categoryCard = document.querySelectorAll('.' + btnClassCard);
  const currentCard = document.querySelector('#' + e.currentTarget.id);
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
}

export function generateToken(tokenLength) {
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < tokenLength; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
   return result;
}