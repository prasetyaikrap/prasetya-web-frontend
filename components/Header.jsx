//import Components
import st from 'styles/header.module.css'
import {Navbar} from 'components/Navbar'
import {ArrowJumbotron} from 'misc/Asset'
import {ProfileJumbotron} from 'components/Jumbotron'

export function Header({language}) {
  //Render the Component
  return (
    <>
    <section id='header-profile' className={`${st.section} flex`}>
      <Navbar language={language}/>
      <div className={`${st.fluidJumbotron} flex-row`}>
        <ProfileJumbotron />
      </div>
      <ArrowJumbotron />
    </section>
    </>
  )
}