import { firestore } from "utils/firebaseConfig";
import {
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import metadata from "data/metadata.json";
import Home from "pages/home/Home";

export async function getStaticProps() {
  const { languages, projects, contacts } = metadata;
  const projectCat = projects.cat.filter((item) => {
    return item.isActive == true;
  });
  const projectData = async (projectCat) => {
    let data = [];
    for await (const cat of projectCat) {
      const snapshot = await getDocs(
        query(
          collection(firestore, "projects"),
          where("isPublic", "==", true),
          where("categoryId", "==", cat.id),
          orderBy("createdAt", "desc"),
          orderBy("isFeatured", "desc"),
          limit(6)
        )
      );
      data.push(...snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }
    return JSON.stringify(data);
  };
  return {
    props: {
      lang: languages,
      projectCat: projectCat,
      projects: await projectData(projectCat),
      contacts,
    },
  };
}

export default function Homepage(props) {
  return <Home propsData={props} />;
}
