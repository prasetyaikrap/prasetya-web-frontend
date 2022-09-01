import st from "styles/admin.module.css";
import Link from "next/link";

export default function SidePanel({ sideMenu }) {
  return (
    <div className={`flex-column ${st.sidePanelContainer}`}>
      {sideMenu.map((menu) => {
        return (
          <Link key={menu.id} href={menu.url} replace={true} shallow={true}>
            <h3 className={`bodyText ${st.menuBox}`}>{menu.name}</h3>
          </Link>
        );
      })}
    </div>
  );
}
