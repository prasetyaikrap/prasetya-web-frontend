//import Component
import st from "styles/components.module.css";
import Link from "next/link";

export default function Navbar({ metadata }) {
  //Get Language Preference
  const {
    info,
    header: { nav, navBtn },
  } = metadata;

  //Render Component
  return (
    <>
      <section id="navbar" className={`${st.navContainer} flex`}>
        <div className={`${st.navBox1} flex`}>
          <Link href={nav.url}>
            <h1>{nav.title}</h1>
          </Link>
        </div>
        <button
          className={`${st.navBurger}`}
          onClick={(e) => {
            const target = document.querySelector(`.${st.navBurger}`);
            const menuBox = document.querySelector(`.${st.navBox2}`);
            if (target.classList.contains(st.nburActive)) {
              target.classList.remove(st.nburActive);
              menuBox.classList.remove(st.nb2Active);
            } else {
              target.classList.add(st.nburActive);
              menuBox.classList.add(st.nb2Active);
            }
          }}
        >
          <span id={st.nbur1}></span>
          <span id={st.nbur2}></span>
          <span id={st.nbur3}></span>
        </button>
        <nav className={`${st.navBox2} flex`}>
          {navBtn.map((item) => {
            return (
              <Link key={item.id} href={item.url}>
                <button
                  className={`flex bodyText ${st.navBtn} ${st.navBtnText}`}
                >
                  {item.title}
                </button>
              </Link>
            );
          })}
          {/* <SwitchLanguage language={info} /> */}
        </nav>
      </section>
    </>
  );
}
