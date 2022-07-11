import st from 'styles/misc.module.css'
import Image from 'next/image';
import {useState} from 'react';
import {useRouter} from 'next/router';

export function SwitchLanguage({language}) {
  const [lang, setLang] = useState(language.code);
  const router = useRouter();
  const switchLang = () => {
    const selectedLanguage = document.getElementById('switchLanguage').value;
    setLang(selectedLanguage);
    router.push('/' + selectedLanguage);
  }
  return (
    <div className={`flex-row ${st.slContainer}`}>
      <span className={`${st.slFlag}`}>
        <Image 
        src={language.icon}
        alt={language.description}
        layout='fill'
        objectFit='cover'
        />
      </span>
      <select name="switchLanguage" id="switchLanguage" defaultValue={lang} onChange={event => switchLang(this)}>
        <option value="id" >Bahasa Indonesia</option>
        <option value="en" >English</option>
      </select>
    </div>
  )
}