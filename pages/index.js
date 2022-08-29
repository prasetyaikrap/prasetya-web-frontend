import { firestore } from "utils/firebaseConfig";
import {
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import ad from "data/assetData.json";
import Home from "pages/home/Home";

export async function getStaticProps() {
  const { language, pCategory, socmed } = {
    language: ad.language,
    pCategory: ad.pCategory.filter((item) => {
      return item.isActive == true;
    }),
    socmed: ad.socmed,
  };
  const projects = async (pCategory) => {
    let data = [];
    for await (const cat of pCategory) {
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
      language,
      pCategory,
      projects: await projects(pCategory),
      socmed,
    },
  };
}

export default function Homepage(props) {
  return <Home propsData={props} />;
}
