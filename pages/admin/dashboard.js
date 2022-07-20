import st from "styles/admin.module.css";
import SidePanel from "pages/adminpage/SidePanel";
import { NavbarAdmin } from "components/Navbar";

export default function DashboardAdmin() {
  return (
    <section id={`${st.adminDashboard}`}>
      <NavbarAdmin />
      {/* <div className={`${st.dummyNavbar}`}></div> */}
      <SidePanel />
    </section>
  );
}
