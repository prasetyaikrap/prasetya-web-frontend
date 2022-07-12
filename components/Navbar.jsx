//import Component
import st from 'styles/navbar.module.css'
import Link from 'next/link'
import { SwitchLanguage } from './misc/Language';
import {NavbarBtn} from "misc/NavbarBtn";

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
        <NavbarBtn btnArray={navBtn} />
        <SwitchLanguage language={info}/>
      </div>
    </nav>
    </>
  )
}

export function Navbar2({language}) {
  const {
    info, 
    project: {
      header: {
        navTitle,
        navBtn
      }
    }} = language
  return (
    <>
    <nav className={` flex ${st.navContainer} ${st.navProject}`}>
      <div className={`${st.navHeader} flex`}>
        <Link href={navTitle.url}>
          <h1>{navTitle.title}</h1>
        </Link>
      </div>
      <div className={`${st.navBtnContainer} flex`}>
        <NavbarBtn btnArray={navBtn}/>
        <SwitchLanguage language={info}/>
      </div>
    </nav>
    </>
  )
}