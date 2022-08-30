import Image from "next/image";
import st from "styles/home.module.css";
import ContactMail from "components/ContactMail";

function SocmedList({ socmedList }) {
  return socmedList.map((item) => {
    return (
      <a
        key={item.id}
        href={item.url}
        target="_blank"
        rel="noreferrer"
        className={`${st.socmedIcon}`}
      >
        <Image
          layout="fill"
          objectFit="cover"
          src={item.icon}
          alt={item.name + " - " + item.description}
        />
      </a>
    );
  });
}

export default function Contact({ language, contactData }) {
  const {
    headline,
    icon: { url, alt },
    mailHeadline,
    mailSubheadline,
    mailForm,
  } = language;
  return (
    <section id="contact" className={`flex-column ${st.contactSection}`}>
      <div className={`flex-column ${st.cBox1}`}>
        <h3>{mailHeadline}</h3>
        <p className={`smallText`}>{mailSubheadline}</p>
        <div className={`${st.mailContainer}`}>
          <ContactMail metadata={mailForm} style={st.customMailForm} />
        </div>
      </div>
      <div className={`flex-column ${st.cBox2}`}>
        <h3>{headline}</h3>
        <div className={`flex-row ${st.socmedBox}`}>
          <SocmedList socmedList={contactData} />
        </div>
      </div>
    </section>
  );
}
