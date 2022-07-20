import Image from "next/image";
import { Footer } from "components/Footer";
import st from "styles/home.module.css";
import ContactMail from "components/ContactMail";

export function SocmedList({ socmedList }) {
  return socmedList.map((item) => {
    return (
      <div key={item.id} className={`flex-row ${st.smCardContainer}`}>
        <span>
          <Image
            layout="fill"
            objectFit="cover"
            src={item.icon}
            alt={item.name + " - " + item.description}
          />
        </span>
        <h4>
          <a href={item.url} target="_blank" rel="noreferrer">
            {item.description}
          </a>
        </h4>
      </div>
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
  const [socmedList] = contactData;
  return (
    <section id="contact" className={`${st.sectionContact}`}>
      <div className={`flex-column ${st.boxOne}`}>
        <div className={`flex-column ${st.socmedBox}`}>
          <div className={`flex-row ${st.headlineBox}`}>
            <span>
              <Image layout="fill" objectFit="cover" src={url} alt={alt} />
            </span>
            <h3>{headline}</h3>
          </div>
          <div className={`flex-column ${st.contactChannelBox}`}>
            <SocmedList socmedList={socmedList.socmed} />
          </div>
        </div>
        <Footer />
      </div>
      <div className={`${st.boxTwo}`}>
        <div className={`flex-column ${st.mailHeadlineBox}`}>
          <h3>{mailHeadline}</h3>
          <p className={`bodyText`}>{mailSubheadline}</p>
        </div>
        <ContactMail language={mailForm} style={st.mailForm} />
      </div>
    </section>
  );
}
