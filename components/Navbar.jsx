//import Component
import st from './styles/navbar.module.css'
import Link from 'next/link'
import langID from '../public/data/lang_idID.json';

export function Navbar(){
  //Get Language Preference
  const {
    navTitle, 
    navBtn, 
    navLangOption:{
      dropdownText,
      dropdownList
    }
  }= langID.home.header;
  
  const navBtnMap = navBtn.map(x => {
    return (
      <Link key = {x.id} href={x.link}>
        <button className={`${st.navBtn} ${st.navBtnText} flex`}>{x.title}</button>
      </Link>
    )
  })

  //Render Component
  return (
    <>
    <nav className={`${st.navContainer} flex`}>
      <div className={`${st.navHeader} flex`}>
        <Link href='/'>
          <h1>{navTitle}</h1>
        </Link>
      </div>
      <div className={`${st.navBtnContainer} flex`}>
        {navBtnMap}
      </div>
    </nav>
    </>
  )
}