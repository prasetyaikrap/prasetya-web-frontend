import WebHead from "components/Head";
import DashboardAdmin from "pages/adminpage/Dashboard";
import st from "styles/admin.module.css";

export default function AdminDashboard() {
  const meta = [{ name: "robots", property: "", content: "noindex, nofollow" }];
  return (
    <>
      <WebHead title="Spinnov Dashboard" meta={meta} link={[]} />
      <section id={`${st.adminDashboard}`}>
        <DashboardAdmin />
      </section>
    </>
  );
}
