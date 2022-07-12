import Link from 'next/link'
import st from 'styles/navbar.module.css'

export function NavbarBtn({btnArray}) {
  const navBtnMap = btnArray.map(x => {
    return (
      <Link key = {x.id} href={x.url}>
        <button className={`flex ${st.navBtn} ${st.navBtnText}`}>{x.title}</button>
      </Link>
    )
  })
  return navBtnMap
}