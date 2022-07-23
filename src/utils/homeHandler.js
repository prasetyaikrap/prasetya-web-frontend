import axios from "axios";

export function categoryClicked(targetId, btnClassCard, focusClass) {
  const categoryCard = document.querySelectorAll("." + btnClassCard);
  const currentCard = document.getElementById(targetId);

  //Reset all Card status
  categoryCard.forEach((btn) => {
    btn.classList.remove(focusClass);
    btn.querySelector("span#black-icon").removeAttribute("style");
    btn.querySelector("span#white-icon").style.display = "none";
  });

  //Set selected card status
  currentCard.classList.add(focusClass);
  currentCard.querySelector("span#black-icon").style.display = "none";
  currentCard.querySelector("span#white-icon").removeAttribute("style");
}

export default async function mailSender(
  confirmClass,
  mailSendingClass,
  confirmMessage,
  setBtnDisabled,
  setMessageLen
) {
  const form = document.getElementById("contactMail");
  const confirmationBox = form.querySelector("#confirmationBox");
  form.querySelector("#mailSending").classList.add(mailSendingClass);
  setBtnDisabled(true);
  const postData = {
    name: form.querySelector("#name").value,
    email: form.querySelector("#email").value,
    contact: form.querySelector("#contactNumber").value,
    category: form.querySelector("#category").value,
    subject: form.querySelector("#subject").value,
    message: form.querySelector("#mailMessage").value,
  };
  //POST Request
  try {
    const res = await axios.post("/api/contact", postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = res.data;
    if (data.status === "success") {
      form.querySelector("#confirmMessage").innerHTML =
        confirmMessage.success.replace("[SENDER]", postData.name);
      confirmationBox.classList.add(confirmClass);
      form.querySelector("#mailSending").classList.remove(mailSendingClass);
      setMessageLen(0);
      form.reset();
    } else {
      form.querySelector("#confirmMessage").innerHTML =
        confirmMessage.failed.replace("[SENDER]", postData.name);
      confirmationBox.classList.add(confirmClass);
      form.querySelector("#mailSending").classList.remove(mailSendingClass);
      setBtnDisabled(false);
    }
  } catch (err) {
    form.querySelector("#confirmMessage").innerHTML =
      confirmMessage.error.replace("[SENDER]", postData.name);
    confirmationBox.classList.add(confirmClass);
    form.querySelector("#mailSending").classList.remove(mailSendingClass);
    setBtnDisabled(false);
  }
}

export function closeConfirmationBox(confirmClass) {
  const confirmBox = document.getElementById("confirmationBox");
  confirmBox.classList.remove(confirmClass);
}
