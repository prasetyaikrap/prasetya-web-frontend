import st from "styles/admin.module.css";
import SidePanel from "pages/adminpage/SidePanel";
import { NavbarAdmin } from "components/Navbar";
import ProjectPanel from "pages/adminpage/ProjectsPanel";
import OverviewPanel from "pages/adminpage/OverviewPanel";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function DashboardAdmin() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (!user) {
      router.replace("/admin");
    }
  });
  if (!user) {
    return <h1>Loading....</h1>;
  } else {
    let panel = <OverviewPanel />;
    const menu = router.query.m;
    switch (true) {
      case menu == "overview":
        panel = <OverviewPanel />;
        break;
      case menu == "projects":
        panel = <ProjectPanel />;
        break;
      default:
    }
    return (
      <>
        <NavbarAdmin />
        <div className={`flex-row ${st.dashboardContainer}`}>
          <SidePanel />
          {panel}
        </div>
      </>
    );
  }
}
