//import Component
import st from 'styles/navbar.module.css'
import Link from 'next/link'
import { SwitchLanguage } from './misc/Language';
import {NavbarBtn} from "misc/NavbarBtn";
import { useEffect } from 'react';

export default function Navbar({language,page}){
  //Get Language Preference
  const [info,nav,navBtn] = language;
  useEffect(() => {
    const navBar = document.getElementById("navbar");
    switch(page) {
      case "projectpage":
        navBar.classList.add(st.navProject)
        break;
      default:
    }
  })
  //Render Component
  return (
    <>
    <nav id="navbar" className={`${st.navContainer} flex`}>
      <div className={`${st.navHeader} flex`}>
        <Link href={nav.url}>
          <h1>{nav.title}</h1>
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