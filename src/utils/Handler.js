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
export function loginAdminHandler(event, setLoading, setIsAlert) {
  event.preventDefault();
  setLoading(true);
  setIsAlert(false);
  const validation = {
    email: "prasetya.ikrapriyadi@gmail.com",
    password: "admin12345",
  };
  const authData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  setTimeout(() => {
    if (
      authData.email === validation.email &&
      authData.password === validation.password
    ) {
      console.log(authData);
      setLoading(false);
    } else {
      console.log("Email atau Password Salah");
      setLoading(false);
      setIsAlert(true);
    }
  }, 3000);
}
