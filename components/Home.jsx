import { Header } from "components/Header";
import { Project } from "components/Project";
import { Contact } from "components/Contact";

export function HomeV1({language,projectData,contactData}) {
  const {header,project,contact} = language;
  return (
    <>
      <Header language={header} />
      <Project language={project} projectData={projectData} />
      <Contact language={contact} contactData={contactData} />
    </>
  );
}
