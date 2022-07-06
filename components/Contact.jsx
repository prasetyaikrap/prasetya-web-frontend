import st from './styles/contact.module.css'

export function Contact() {
  return (
    <section id="contact" className={`${st.section}`}>
      <div className={`${st.boxOne}`}>
        <div className={`${st.headlineBox}`}></div>
        <div className={`${st.contactChannelBox}`}></div>
      </div>
      <div className={`${st.boxTwo}`}>
        <div className={`${st.headlineBox}`}></div>
        <div className={`${st.mailFormBox}`}></div>
      </div>
    </section>
  )
}