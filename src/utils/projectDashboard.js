import st from "styles/projects.module.css";

export function openProject(targetId, projectData, setSelectedProject) {
  //Reset and Set Active Button
  const cardsElement = document.querySelectorAll(`.${st.cardsProject}`);
  cardsElement.forEach((element) => {
    if (element.id === targetId) {
      element.classList.add(st.pActive);
    } else {
      element.classList.remove(st.pActive);
    }
  });
  //Open selected project preview
  const projectPreview = document.getElementById("projectPreview");
  projectPreview.classList.add(`${st.cbContent2ndOpen}`);

  //set selected prject data
  setSelectedProject(projectData);
}

export function filterCategory(targetId) {
  const btnElements = document.querySelectorAll("." + st.hCategoryBox);
  //Add and Remove highlighted class
  btnElements.forEach((item) => {
    item.classList.remove(st.hCategoryBoxFocus);
  });
  document.getElementById(targetId).classList.add(st.hCategoryBoxFocus);
}
