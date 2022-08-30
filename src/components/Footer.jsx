import st from "styles/components.module.css";

export default function Footer({ customClass = "" }) {
  const year = new Date().getFullYear();
  return (
    <footer className={`${st.footer} ${customClass}`}>
      <p>{`Copyright ${year} | Prasetya Ikra Priyadi`}</p>
    </footer>
  );
}
