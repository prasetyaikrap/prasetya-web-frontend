import { useRef, useState } from "react"
import st from "styles/admin.module.css"
import { loginAdminHandler } from "utils/Handler"

export default function Auth() {
  const [loading,setLoading] = useState(false);
  const [isAlert, setIsAlert] = useState(false)
  return (
    <div className={`flex-column ${st.loginBox}`}>
      <h3 id="title">SPINNOVID WEBAPP</h3>
      <p id={st.alert} style={{visibility: (isAlert) ? "visible" : "hidden"}} className={`smallText `}>Email atau Password Salah</p>
      <form onSubmit={e => loginAdminHandler(e,setLoading,setIsAlert)}>
        <div>
          <label htmlFor="email" className={`bodyText`}>Email</label>
          <input type="email" id="email" name="email" required/>
        </div>
        <div>
          <label htmlFor="password" className={`bodyText`}>Password</label>
          <input type="password" id="password" name="password" required/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}