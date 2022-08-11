//import Component
import st from "styles/navbar.module.css";
import Link from "next/link";
import { SwitchLanguage } from "components/Language";
import { useEffect } from "react";

export default function Navbar({ language, page }) {
  //Get Language Preference
  const [info, nav, navBtn] = language;
  useEffect(() => {
    const navBar = document.getElementById("navbar");
    switch (page) {
      case "projectpage":
        navBar.classList.add(st.navProject);
        break;
      default:
    }
  });
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
          {navBtn.map((x) => {
            return (
              <Link key={x.id} href={x.url}>
                <button className={`flex ${st.navBtn} ${st.navBtnText}`}>
                  {x.title}
                </button>
              </Link>
            );
          })}
          <SwitchLanguage language={info} />
        </div>
      </nav>
    </>
  );
}

export function NavbarAdmin() {
  return (
    <nav id="navbar" className={`flex ${st.navContainer} ${st.navAdmin}`}>
      <div className={`${st.navHeader} flex`}>
        <Link href="/" target="_blank">
          <h1>SPINNOVID</h1>
        </Link>
      </div>
    </nav>
  );
}
