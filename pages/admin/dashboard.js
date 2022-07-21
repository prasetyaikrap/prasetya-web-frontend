import st from "styles/admin.module.css";
import SidePanel from "pages/adminpage/SidePanel";
import { NavbarAdmin } from "components/Navbar";
import ProjectPanel from "pages/adminpage/ProjectsPanel";

export default function DashboardAdmin() {
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
