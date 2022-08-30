import axios from "axios";
import st from "styles/home.module.css";

export function categoryClicked(targetId) {
  const categoryCard = document.querySelectorAll(`.${st.catListBox}`);
  const currentCard = document.getElementById(targetId);

  //Reset all Card status
  categoryCard.forEach((btn) => {
    btn.classList.remove(st.clbOnFocus);
    btn.querySelector("span#black-icon").removeAttribute("style");
    btn.querySelector("span#white-icon").style.display = "none";
  });

  //Set selected card status
  currentCard.classList.add(st.clbOnFocus);
  currentCard.querySelector("span#black-icon").style.display = "none";
  currentCard.querySelector("span#white-icon").removeAttribute("style");
}

export async function mailSender(formData, confirmMessage, stateControl) {
  const {
    setBtnDisabled,
    setIsSending,
    setSendConfirm,
    setMessageLen,
    setConfirmationMessage,
  } = stateControl;
  setBtnDisabled(true);
  setIsSending(true);

  try {
    const appkey = process.env.SPINNOVID_APPKEY;
    const res = await axios.post(`/api/contact?appkey=${appkey}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = res.data;
    if (data.status == "success") {
      setConfirmationMessage(
        confirmMessage.success.replace("[SENDER]", formData.name)
      );
      setSendConfirm(true);
      setBtnDisabled(false);
      setIsSending(false);
      setMessageLen(0);
      document.getElementById("contactMail").reset();
    } else {
      setConfirmationMessage(
        confirmMessage.failed.replace("[SENDER]", formData.name)
      );
      setSendConfirm(true);
      setBtnDisabled(false);
      setIsSending(false);
    }
  } catch (err) {
    setConfirmationMessage(
      confirmMessage.error.replace("[SENDER]", formData.name)
    );
    setSendConfirm(true);
    setBtnDisabled(false);
    setIsSending(false);
  }
}
