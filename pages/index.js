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
  let projects = [];
  try {
    //Get Projects
    pCategory
      .filter((cat) => {
        cat.isActive == true;
      })
      .forEach(async (cat) => {
        const snapshot = await getDocs(
          query(
            collection(firestore, "projects"),
            where("isPublic", "==", true),
            where("categoryId", "==", cat.id),
            orderBy("createdAt", "desc"),
            limit(6)
          )
        );
        projects.push(
          ...snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
    //Get Featured List
    const snapshot = await getDocs(
      query(
        collection(firestore, "projects"),
        where("isPublic", "==", true),
        where("isFeatured", "==", true),
        orderBy("createdAt", "desc"),
        limit(6)
      )
    );
    projects.push(
      ...snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
    //Conver to JSON
    projects = JSON.stringify([...new Set(projects)]);
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      language,
      pCategory,
      projects,
      socmed,
    },
  };
}

export default function Homepage(props) {
  return <Home propsData={props} />;
}
