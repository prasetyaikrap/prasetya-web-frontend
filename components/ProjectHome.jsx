import { Navbar2 } from "./Navbar";
import { ProjectHomeBody } from "./Project";
import st from 'styles/project.module.css'

export default function ProjectHome({language}) {
  const {info,_ignore,project} = language;
  return (
    <section className={`flex-column ${st.projectHome}`}>
      <Navbar2 language={{info,project}}/>
      <ProjectHomeBody />
    </section>
  )
}