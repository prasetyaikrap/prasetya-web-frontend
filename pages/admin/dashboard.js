import st from "styles/admin.module.css";
import SidePanel from "pages/adminpage/SidePanel";
import { NavbarAdmin } from "components/Navbar";
import ProjectPanel from "pages/adminpage/ProjectsPanel";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
export default function DashboardAdmin() {
  const { user, logout } = useAuth();
  const router = useRouter();
  if (!user) {
    router.replace("/admin");
  } else {
    return (
      <section id={`${st.adminDashboard}`}>
        <NavbarAdmin />
        <div className={`flex-row ${st.dashboardContainer}`}>
          <SidePanel />
          <ProjectPanel />
        </div>
      </section>
    );
  }
}
