import st from "styles/admin.module.css"

export default function SidePanel() {
  return (
    <div className={`flex-column ${st.sidePanelContainer}`}>
      <button className={`bodyText ${st.menuBox}`}>Overview</button>
      <button className={`bodyText ${st.menuBox}`}>Projects</button>
      <button className={`bodyText ${st.menuBox}`}>Logout</button>
    </div>
  )
}