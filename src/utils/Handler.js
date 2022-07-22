import { Router } from "next/router";

export function ProjCategoryClicked(targetId, btnClassCard, focusClass) {
  const categoryCard = document.querySelectorAll("." + btnClassCard);
  const currentCard = document.getElementById(targetId);

  //Reset all Card status
  categoryCard.forEach((btn) => {
    btn.classList.remove(focusClass);
    btn.querySelector("span#black-icon").removeAttribute("style");
    btn.querySelector("span#white-icon").style.display = "none";
    // btn.querySelector('div[data-arrow=categoryArrow]').style.display = 'none';
  });

  //Set selected card status
  currentCard.classList.add(focusClass);
  currentCard.querySelector("span#black-icon").style.display = "none";
  currentCard.querySelector("span#white-icon").removeAttribute("style");
  //   currentCard.querySelector('div[data-arrow=categoryArrow]').style.display = '';
}
