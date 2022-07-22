import { useState } from "react";
import st from "styles/admin.module.css";
import { useRouter } from "next/router";
import { useAuth } from "context/AuthContext";
import { handleLogin } from "utils/adminHandler";

export default function Auth() {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [errMessage, setErrMessage] = useState();
  const router = useRouter();

  if (user) {
    router.replace("/admin/dashboard");
  } else {
    return (
      <div className={`flex-column ${st.loginBox}`}>
        <h3 id="title">SPINNOVID WEBAPP</h3>
        <p
          id={st.alert}
          style={{ visibility: isAlert ? "visible" : "hidden" }}
          className={`smallText `}
        >
          {errMessage}
        </p>
        <form
          id="loginForm"
          onSubmit={(e) =>
            handleLogin(e, setLoading, setIsAlert, setErrMessage, router, login)
          }
        >
          <div>
            <label htmlFor="email" className={`bodyText`}>
              Email
            </label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password" className={`bodyText`}>
              Password
            </label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
