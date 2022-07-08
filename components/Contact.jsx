import st from 'styles/contact.module.css'

export function ContactForm(props) {
  return (
    <>
    <h3></h3>
    <div className={`${st.mailFormBox}`}></div>
    </>
  )
}

export function Contact(props) {
  return (
    <section id="contact" className={`${st.section}`}>
      <div className={`${st.boxOne}`}>
        <div className={`${st.headlineBox}`}></div>
        <div className={`${st.contactChannelBox}`}></div>
      </div>
      <div className={`${st.boxTwo}`}>
        <ContactForm />
      </div>
    </section>
  )
}