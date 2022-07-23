import st from "styles/admin.module.css";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";

export default function SidePanel() {
  const { logout } = useAuth();
  return (
    <div className={`flex-column ${st.sidePanelContainer}`}>
      <button className={`bodyText ${st.menuBox}`}>Overview</button>
      <button className={`bodyText ${st.menuBox}`}>Projects</button>
      <button className={`bodyText ${st.menuBox}`} onClick={(e) => logout()}>
        Logout
      </button>
    </div>
  );
}
