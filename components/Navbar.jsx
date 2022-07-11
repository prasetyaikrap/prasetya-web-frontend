//import Component
import st from 'styles/navbar.module.css'
import Link from 'next/link'
import { SwitchLanguage } from './misc/Language';

export function Navbar({language}){
  //Get Language Preference
  const {
    info,
    header: {
      navTitle: {
        title,
        url
      }, 
      navBtn, 
    }
  }= language;
  
  const navBtnMap = navBtn.map(x => {
    return (
      <Link key = {x.id} href={x.url}>
        <button className={`flex ${st.navBtn} ${st.navBtnText}`}>{x.title}</button>
      </Link>
    )
  })

  //Render Component
  return (
    <>
    <nav className={`${st.navContainer} flex`}>
      <div className={`${st.navHeader} flex`}>
        <Link href={url}>
          <h1>{title}</h1>
        </Link>
      </div>
      <div className={`${st.navBtnContainer} flex`}>
        {navBtnMap}
        <SwitchLanguage language={info}/>
      </div>
    </nav>
    </>
  )
}