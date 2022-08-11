import CrossBtn from "components/CrossBtn";
import { useEffect, useRef, useState } from "react";
import st from "styles/components.module.css";
import mailSender, { closeConfirmationBox } from "utils/homeHandler";

export default function ContactMail({ language, style = "" }) {
  const nameRef = useRef();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [messageLen, setMessageLen] = useState(0);
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
  } = language;
  return (
    <>
      <form
        id="contactMail"
        className={`flex-column ${st.mailFormBox} ${style}`}
        onSubmit={(e) => {
          e.preventDefault();
          mailSender(
            st.confirmationBoxOpen,
            st.mailSendingLoading,
            confirmMessage,
            setBtnDisabled,
            setMessageLen
          );
        }}
      >
        <div className={`flex-row ${st.formSection}`}>
          <div className={`flex-column ${st.col3Box}`}>
            <label className={`bodyText`} htmlFor="name">
              {mailName}*
            </label>
            <input id="name" name="name" type="text" ref={nameRef} required />
          </div>
          <div className={`flex-column ${st.col3Box}`}>
            <label className={`bodyText`} htmlFor="email">
              {mailFrom}*
            </label>
            <input id="email" name="email" type="text" required />
          </div>
          <div className={`flex-column ${st.col3Box}`}>
            <label className={`bodyText`} htmlFor="contactNumber">
              {mailContact}
            </label>
            <input id="contactNumber" name="contactNumber" type="tel" />
          </div>
        </div>
        <div className={`flex-row ${st.formSection}`}>
          <div id={`${st["category"]}`} className={`flex-column ${st.col2Box}`}>
            <label className={`bodyText`} htmlFor="category">
              {mailCategory}*
            </label>
            <select id="category" name="category" type="text" required>
              <option value="general">General</option>
              <option value="collaboration">Work and Collaboration</option>
              <option value="sponsorship">Sponsorship</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div id={`${st["subject"]}`} className={`flex-column ${st.col2Box}`}>
            <label className={`bodyText`} htmlFor="subject">
              {mailSubject}*
            </label>
            <input id="subject" name="subject" type="text" required />
          </div>
        </div>
        <div className={`flex-row ${st.formSection}`}>
          <div className={`flex-column ${st.col1Box}`}>
            <label className={`bodyText`} htmlFor="mailMessage">
              {mailMessage}*
            </label>
            <textarea
              id="mailMessage"
              name="mailMessage"
              onChange={(e) => setMessageLen(e.target.value.length)}
              required
            ></textarea>
          </div>
        </div>
        <div className={`flex-row ${st.formSection} ${st.sendBtnContainer}`}>
          <span id={st.limitAlert}>
            {(messageLen > 0 && messageLen < 20) || messageLen > 500
              ? `message should be minimum 20 and maximum 500 characters`
              : `${messageLen} / 500`}
          </span>
          <button
            disabled={btnDisabled}
            style={{
              opacity: btnDisabled ? ".8" : "1",
              cursor: btnDisabled ? "default" : "pointer",
            }}
            type="submit"
            className={`bodyText`}
          >
            {mailSendBtn}
          </button>
          <span id="mailSending" className={`bodyText ${st.mailSending}`}>
            {mailSending}
          </span>
        </div>
        <div id="confirmationBox" className={`flex ${st.confirmationBox}`}>
          <h3 id="confirmMessage">confirmMessage</h3>
          <CrossBtn
            handler={(e) => {
              e.preventDefault();
              closeConfirmationBox(st.confirmationBoxOpen);
            }}
            addClass={st.closeConfirmationBtn}
          />
        </div>
      </form>
    </>
  );
}
