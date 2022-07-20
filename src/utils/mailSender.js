import axios from "axios";

export default async function mailSender(confirmClass, setConfirmMessage) {
  const form = document.getElementById("contactMail");
  const confirmationBox = form.querySelector("#confirmationBox");
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
      setConfirmMessage(
        "Hi, " +
          postData.name +
          ", I Have recevied your message. Thank you for visiting and nice to meet you"
      );
      confirmationBox.classList.add(confirmClass);
      //Reset Field
      form.querySelector("#name").value = "";
      form.querySelector("#email").value = "";
      form.querySelector("#contactNumber").value = "";
      form.querySelector("#category").value = "general";
      form.querySelector("#subject").value = "";
      form.querySelector("#mailMessage").value = "";
    } else {
      setConfirmMessage(
        "Hi, " +
          postData.name +
          ", something went wrong. I can't receive your message recently. Please try again later."
      );
      confirmationBox.classList.add(confirmClass);
    }
  } catch (err) {
    setConfirmMessage(
      "Hey, " +
        postData.name +
        ", Sorry, I cannot receive any message recently. But, you can contact me directly through my email on the left panel."
    );
    confirmationBox.classList.add(confirmClass);
  }
}

export function closeConfirmationBox(confirmClass) {
  const confirmBox = document.getElementById("confirmationBox");
  confirmBox.classList.remove(confirmClass);
}
