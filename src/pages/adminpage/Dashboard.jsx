import st from "styles/admin.module.css";
import SidePanel from "pages/adminpage/SidePanel";
import ProjectPanel from "pages/adminpage/ProjectsPanel";
import OverviewPanel from "pages/adminpage/OverviewPanel";
import { MainLayout } from "components/Layout";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function DashboardAdmin({ adminMetadata }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (!user) {
      router.replace("/admin");
    }
  }, []);
  if (!user) {
    return <h1>Loading....</h1>;
  } else {
    let panel = <OverviewPanel />;
    const menu = router.query.m;
    switch (true) {
      case menu == "dashboard":
        panel = <OverviewPanel />;
        break;
      case menu == "projects":
        panel = <ProjectPanel />;
        break;
      case menu == "logout":
        logout();
        break;
      default:
    }
    const {
      info,
      adminpage: { navbar, sideMenu },
    } = adminMetadata;
    const headProps = {
      title: "Spinnov Dashboard",
      meta: [{ name: "robots", property: "", content: "noindex, nofollow" }],
    };
    return (
      <MainLayout headProps={headProps} navbarProps={{ info, navbar }}>
        <section className={`flex-row ${st.dashboardContainer}`}>
          <SidePanel sideMenu={sideMenu} />
          {panel}
        </section>
      </MainLayout>
    );
  }
}
