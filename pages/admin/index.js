import Auth from "pages/adminpage/Auth";
import st from "styles/admin.module.css";
import WebHead from "components/Head";

export default function AdminLogin() {
  return (
    <>
      <WebHead
        title="Login Page"
        meta={[{ name: "robots", property: "", content: "noindex, nofollow" }]}
        link={[]}
      />
      <section className={`flex ${st.sectionLogin}`}>
        <Auth />
      </section>
    </>
  );
}
