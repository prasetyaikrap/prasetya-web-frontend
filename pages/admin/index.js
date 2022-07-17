import Auth from "pages/adminpage/Auth";
import st from "styles/admin.module.css";

export default function LoginPage() {
  return (
    <section className={`flex ${st.sectionLogin}`}>
      <Auth />
    </section>
  );
}
