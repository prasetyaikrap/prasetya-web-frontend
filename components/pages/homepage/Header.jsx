//import Components
import st from 'styles/home.module.css'
import Navbar from 'components/Navbar'
import {ProfileJumbotron} from 'compPages/homepage/Jumbotron'

export default function Header({language}) {
  const {
    info,
    header: {
      nav,
      navBtn
    }}= language;
  //Render the Component
  return (
    <>
    <section id='header-profile' className={`flex ${st.sectionHeader}`}>
      <Navbar language={[info,nav,navBtn]}/>
      <div className={`flex-row ${st.fluidJumbotron}`}>
        <ProfileJumbotron />
      </div>
    </section>
    </>
  )
}