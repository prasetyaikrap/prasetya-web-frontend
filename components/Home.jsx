import { Header } from "components/Header";
import { Project } from "components/Project";
import { Contact } from "components/Contact";

export function HomeV1({language,projectData,contactData}) {
  const {
    info,
    home: {
      header,
      project,
      contact
    }
  } = language;
  return (
    <>
      <Header language={{info,header}} />
      <Project language={project} projectData={projectData} />
      <Contact language={contact} contactData={contactData} />
    </>
  );
}
