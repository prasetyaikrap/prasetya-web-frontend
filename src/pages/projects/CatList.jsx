import st from "styles/projects.module.css";
import { filterCategory } from "utils/projectDashboard";
import { useRouter } from "next/router";

export default function CatList({ catList }) {
  const router = useRouter();
  const generateCategory = catList.map((item) => {
    return (
      <button
        key={item.id}
        id={item.id}
        className={`bodyText flex ${st.hCategoryBox}`}
        onClick={(e) => {
          filterCategory(e.currentTarget.id);
          router.push(
            {
              pathname: "/[lang]/projects",
              query: { lang: router.query.lang, cat: e.currentTarget.id },
            },
            undefined,
            { shallow: true }
          );
        }}
      >
        {item.name}
      </button>
    );
  });
  return (
    <>
      <button
        id="all"
        className={`bodyText flex ${st.hCategoryBox} ${st.hCategoryBoxFocus}`}
        onClick={(e) => {
          filterCategory(e.currentTarget.id);
          router.push(
            {
              pathname: "/[lang]/projects",
              query: { lang: router.query.lang, cat: e.currentTarget.id },
            },
            undefined,
            { shallow: true }
          );
        }}
      >
        All
      </button>
      <button
        id="featured"
        className={`bodyText flex ${st.hCategoryBox}`}
        onClick={(e) => {
          filterCategory(e.currentTarget.id);
          router.push(
            {
              pathname: "/[lang]/projects",
              query: { lang: router.query.lang, cat: e.currentTarget.id },
            },
            undefined,
            { shallow: true }
          );
        }}
      >
        Featured
      </button>
      {generateCategory}
    </>
  );
}
