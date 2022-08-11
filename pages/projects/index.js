import ad from "data/assetData.json";

import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "utils/firebaseConfig";
import Projects from "pages/projects/Projects";

export async function getStaticProps({}) {
  const { language, pCategory } = {
    language: ad.language,
    pCategory: ad.pCategory.filter((item) => {
      return item.isActive == true;
    }),
  };

  //Get Project
  const snapshots = await getDocs(
    query(
      collection(firestore, "projects"),
      where("isPublic", "==", true),
      orderBy("createdAt", "desc")
    )
  );
  const projects = JSON.stringify([
    ...snapshots.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
  ]);
  //Get Category
  return {
    props: {
      language,
      pCategory,
      projects,
    },
  };
}

export default function ProjectPage(props) {
  return <Projects propsData={props} />;
}
