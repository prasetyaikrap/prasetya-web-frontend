import ad from "data/metadata.json";

import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "utils/firebaseConfig";
import Projects from "pages/projects/Projects";

export async function getStaticProps({}) {
  const { languages, projects } = ad;
  const projectCat = projects.cat.filter((item) => {
    return item.isActive == true;
  });
  //Get Project
  const snapshots = await getDocs(
    query(
      collection(firestore, "projects"),
      where("isPublic", "==", true),
      orderBy("createdAt", "desc")
    )
  );
  const projectData = JSON.stringify([
    ...snapshots.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
  ]);
  //Get Category
  return {
    props: {
      lang: languages,
      projectCat: projectCat,
      projects: projectData,
    },
  };
}

export default function ProjectPage(props) {
  return <Projects propsData={props} />;
}
