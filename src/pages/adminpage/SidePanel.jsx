import st from "styles/admin.module.css";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";

export default function SidePanel() {
  const { logout } = useAuth();
  const router = useRouter();
  return (
    <div className={`flex-column ${st.sidePanelContainer}`}>
      <button
        id="overview"
        type="button"
        className={`bodyText ${st.menuBox}`}
        onClick={(e) => {
          router.replace(
            {
              pathname: "/admin/dashboard",
              query: {
                m: e.currentTarget.id,
              },
            },
            undefined,
            { shallow: true }
          );
        }}
      >
        Overview
      </button>
      <button
        id="projects"
        type="button"
        className={`bodyText ${st.menuBox}`}
        onClick={(e) => {
          router.replace(
            {
              pathname: "/admin/dashboard",
              query: {
                m: e.currentTarget.id,
              },
            },
            undefined,
            { shallow: true }
          );
        }}
      >
        Projects
      </button>
      <button
        id="logout"
        type="button"
        className={`bodyText ${st.menuBox}`}
        onClick={(e) => logout()}
      >
        Logout
      </button>
    </div>
  );
}
