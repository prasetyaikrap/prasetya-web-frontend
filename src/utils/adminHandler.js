import st from "styles/admin.module.css";

//Login and Logout Handler
export async function handleLogin(
  event,
  setLoading,
  setIsAlert,
  setErrMessage,
  router,
  login
) {
  event.preventDefault();
  const form = document.getElementById(event.currentTarget.id);
  setLoading(true);
  setIsAlert(false);
  const result = await login(
    form.querySelector("#email").value,
    form.querySelector("#password").value
  );
  switch (result.status) {
    case "OK":
      setLoading(false);
      router.push("/admin/dashboard");
      break;
    case "auth/wrong-password":
      setLoading(false);
      setIsAlert(true);
      setErrMessage("wrong email or password. Please try again");
      break;
    case "auth/user-not-found":
      setLoading(false);
      setIsAlert(true);
      setErrMessage("User Not Found. Please try again");
      break;
    case "auth/too-many-requests":
      setLoading(false);
      setIsAlert(true);
      setErrMessage(
        "Oops... too many failed attempts... please try again in 5 minutes"
      );
      break;
    default:
  }
  console.clear();
}
export function handleLogout(router, logout) {
  logout();
  router.push("/admin");
}
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
