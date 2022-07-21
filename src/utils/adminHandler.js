import st from "styles/admin.module.css";

//Project Panel
export function editpvProject() {
  //Open Project Preview
  const pvElement = document.getElementById(st.pvContainer);
  pvElement.classList.add(st.pvContainerOpen);
}
export function createpvProject() {
  //Open Project Preview
  const pvElement = document.getElementById(st.pvContainer);
  pvElement.classList.add(st.pvContainerOpen);
}
export function projectOnSave(targetId) {
  const form = document.getElementById(targetId);
  const data = {
    title: form.querySelector("#title").value,
    description: form.querySelector("#description").value,
    tags: form
      .querySelector("#tags")
      .value.split(",")
      .map((item) => {
        return item.trim();
      }),
    image: form.querySelector("#pvUploadImage").files[0],
    btnLink: [
      {
        name: form.querySelector("#btnName1").value,
        url: form.querySelector("#btnLink1").value,
      },
      {
        name: form.querySelector("#btnName2").value,
        url: form.querySelector("#btnLink2").value,
      },
      {
        name: form.querySelector("#btnName3").value,
        url: form.querySelector("#btnLink3").value,
      },
    ],
    isFeatured: form.querySelector("#setFeatured").value,
    isPublic: form.querySelector("#setVisibility").value,
  };
  console.log(data);
}
