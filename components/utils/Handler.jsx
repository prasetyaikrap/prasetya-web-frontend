
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

export function generateRandom(charLength) {
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < charLength; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
   return result;
}

export function openProject(isOpenHandler,style) {
  const [isOpen, setIsOpen] = isOpenHandler;
  const projectPageElement = document.getElementById('projectShowcase');
  if(isOpen === false) {
    projectPageElement.classList.add(style);
    setIsOpen(true)
  }
}
export function closeProject(isOpenHandler,style) {
  const [isOpen, setIsOpen] = isOpenHandler;
  const projectPageElement = document.getElementById('projectShowcase');
  if(isOpen === true) {
    projectPageElement.classList.remove(style);
    setIsOpen(false)
  }
}
export function filterCategory(event,classes) {
  const btnElements= document.querySelectorAll("." + classes[0])
  const selectedId = event.currentTarget.id;
  //Add and Remove highlighted class
  btnElements.forEach(item => {
    item.classList.remove(classes[1])
  })
  document.getElementById(selectedId).classList.add(classes[1])
}