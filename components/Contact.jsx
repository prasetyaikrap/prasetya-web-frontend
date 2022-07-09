import Image from "next/image"
import st from 'styles/contact.module.css'

export function SocmedList({socmedList}) {
  return (
    socmedList.map(item => {
      return (
        <div key={item.id} className={`flex-row ${st.smCardContainer}`}>
          <span>
            <Image 
            layout="fill"
            objectFit="cover"
            src={item.icon}
            alt={item.name + ' - ' + item.description}
            />
          </span>
          <h4><a href={item.url} target="_blank" rel="noreferrer">{item.description}</a></h4>
        </div>
      )
    })
  )
}

export function Contact({language,contactData}) {
  const {
    headline,
    icon: {
      url,
      alt
    },
    mailHeadline,
    mailSubheadline,
    mailForm: {
      mailName,
      mailFrom,
      mailContact,
      mailSubject,
      mailCategory,
      mailMessage,
      mailSendBtn
    },
  } = language;
  const year = new Date().getFullYear();
  const [socmedList] = contactData
  return (
    <section id="contact" className={`${st.section}`}>
      <div className={`flex-column ${st.boxOne}`}>
        <div className={`flex-column ${st.socmedBox}`}>
          <div className={`flex-row ${st.headlineBox}`}>
            <span>
              <Image 
              layout="fill"
              objectFit="cover"
              src={url}
              alt={alt}
              />
            </span>
            <h3>{headline}</h3>
          </div>
          <div className={`flex-column ${st.contactChannelBox}`}>
            <SocmedList socmedList={socmedList.socmed}/>
          </div>
        </div>
        <footer className={`flex smallText`}>Copyright {year} | Prasetya Ikra Priyadi</footer>
      </div>
      <div className={`${st.boxTwo}`}>
        <div className={`flex-column ${st.mailHeadlineBox}`}>
          <h3>{mailHeadline}</h3>
          <p className={`bodyText`}>{mailSubheadline}</p>
        </div>
        <div className={`flex-column ${st.mailFormBox}`}>
          <div className={`flex-row ${st.formSection}`}>
            <div className={`flex-column ${st.col3Box}`}>
              <label className={`bodyText`} htmlFor="name">{mailName}*</label>
              <input id="name" name="name" type="text" required/>
            </div>
            <div className={`flex-column ${st.col3Box}`}>
              <label className={`bodyText`} htmlFor="email">{mailFrom}*</label>
              <input id="email" name="email" type="text" required/>
            </div>
            <div className={`flex-column ${st.col3Box}`}>
              <label className={`bodyText`} htmlFor="contactNumber">{mailContact}</label>
              <input id="contactNumber" name="contactNumber" type="text"/>
            </div>
          </div>
          <div className={`flex-row ${st.formSection}`}>
            <div id={`${st["category"]}`} className={`flex-column ${st.col2Box}`}>
              <label className={`bodyText`} htmlFor="category">{mailCategory}*</label>
              <select id="category" name="category" type="text" required>
                <option value="general">General</option>
                <option value="collaboration">Work and Collaboration</option>
                <option value="sponsorship">Sponsorship</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div id={`${st["subject"]}`} className={`flex-column ${st.col2Box}`}>
              <label className={`bodyText`} htmlFor="subject">{mailSubject}*</label>
              <input id="subject" name="subject" type="text" required/>
            </div>
          </div>
          <div className={`flex-row ${st.formSection}`}>
            <div className={`flex-column ${st.col1Box}`}>
              <label className={`bodyText`} htmlFor="mailMessage">{mailMessage}*</label>
              <textarea id="mailMessage" name="mailMessage" required></textarea>
            </div>
          </div>
          <div className={`flex-row ${st.formSection} ${st.sendBtnContainer}`}>
            <button>{mailSendBtn}</button>
          </div>
        </div>
      </div>
    </section>
  )
}