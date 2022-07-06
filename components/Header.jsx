//import Components
import st from './styles/header.module.css'
import {Navbar} from './Navbar'
import {ArrowJumbotron} from './misc/Asset'
import {Profile} from './Jumbotron'

export function Header(props) {
  //Render the Component
  return (
    <>
    <section id='header-profile' className={`${st.section} flex`}>
      <Navbar />
      <div className={`${st.fluidJumbotron} flex-row`}>
        <Profile />
      </div>
      <ArrowJumbotron />
    </section>
    </>
  )
}