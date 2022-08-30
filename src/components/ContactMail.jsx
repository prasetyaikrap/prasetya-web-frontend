import { CrossBtn } from "components/Asset";
import { useEffect, useState, useRef } from "react";
import st from "styles/components.module.css";
import { mailSender } from "utils/homeHandler";

export default function ContactMail({ metadata, style = "" }) {
  const mfName = useRef("");
  const mfEmail = useRef("");
  const mfContact = useRef("62");
  const mfCategory = useRef("");
  const mfSubject = useRef("");
  const mfMessage = useRef("");
  const formData = {
    name: mfName.current.value,
    email: mfEmail.current.value,
    contact: mfContact.current.value,
    category: mfCategory.current.value,
    subject: mfSubject.current.value,
    message: mfMessage.current.value,
  };
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [sendConfirm, setSendConfirm] = useState(false);
  const [messageLen, setMessageLen] = useState(0);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  useEffect(() => {
    if (messageLen < 20 || messageLen > 500) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [messageLen]);
  const {
    mailName,
    mailFrom,
    mailContact,
    mailSubject,
    mailCategory,
    mailMessage,
    mailSendBtn,
    mailSending,
    confirmMessage,
  } = metadata;
  return (
    <form
      id="contactMail"
      className={`${st.mailFormContainer} ${style}`}
      onSubmit={(e) => {
        e.preventDefault();
        mailSender(formData, confirmMessage, {
          setBtnDisabled,
          setIsSending,
          setSendConfirm,
          setMessageLen,
          setConfirmationMessage,
        });
      }}
    >
      <div className={`${st.inputBox} ${st.formName}`}>
        <label className={`bodyText`} htmlFor="name">
          {mailName}*
        </label>
        <input
          id="name"
          name="name"
          type="text"
          ref={mfName}
          placeholder="Your name"
          required
        />
      </div>
      <div className={`${st.inputBox} ${st.formEmail}`}>
        <label className={`bodyText`} htmlFor="email">
          {mailFrom}*
        </label>
        <input
          id="email"
          name="email"
          type="text"
          ref={mfEmail}
          placeholder="yourname@mail.com"
          required
        />
      </div>
      <div className={`${st.inputBox} ${st.formContact}`}>
        <label className={`bodyText`} htmlFor="contactNumber">
          {mailContact}
        </label>
        <input
          id="contactNumber"
          name="contactNumber"
          type="tel"
          ref={mfContact}
          placeholder="62..."
        />
      </div>
      <div className={`${st.inputBox} ${st.formCategory}`}>
        <label className={`bodyText`} htmlFor="category">
          {mailCategory}*
        </label>
        <select
          id="category"
          name="category"
          type="text"
          ref={mfCategory}
          required
        >
          <option value="general">General</option>
          <option value="collaboration">Work and Collaboration</option>
          <option value="sponsorship">Sponsorship</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div className={`${st.inputBox} ${st.formSubject}`}>
        <label className={`bodyText`} htmlFor="subject">
          {mailSubject}*
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          ref={mfSubject}
          placeholder="I am contacting for ..."
          required
        />
      </div>
      <div className={`${st.inputBox} ${st.formMessage}`}>
        <label className={`bodyText`} htmlFor="mailMessage">
          {mailMessage}*
        </label>
        <textarea
          id="mailMessage"
          name="mailMessage"
          ref={mfMessage}
          rows="7"
          onChange={(e) => setMessageLen(e.target.value.length)}
          required
        ></textarea>
      </div>
      <div className={`${st.actionBox}`}>
        <span id="formAlert" className={`smallText ${st.formAlert}`}>
          {(messageLen > 0 && messageLen < 20) || messageLen > 300
            ? `message should be minimum 20 and maximum 300 characters`
            : `${messageLen} / 500`}
        </span>
        <button
          disabled={btnDisabled}
          style={{
            opacity: btnDisabled ? ".8" : "1",
            cursor: btnDisabled ? "default" : "pointer",
          }}
          type="submit"
          className={`bodyText ${st.sendBtn}`}
        >
          {mailSendBtn}
        </button>
        {isSending && (
          <span id="formSending" className={`smallText ${st.formSending}`}>
            {mailSending}
          </span>
        )}
      </div>
      {sendConfirm && (
        <div id="confirmBox" className={`flex ${st.confirmBox}`}>
          <h3 id="confirmMessage">{confirmationMessage}</h3>
          <CrossBtn
            handler={(e) => {
              e.preventDefault();
              setSendConfirm(false);
              setConfirmationMessage("");
            }}
            customClass={st.cbBtnClose}
          />
        </div>
      )}
    </form>
  );
}
