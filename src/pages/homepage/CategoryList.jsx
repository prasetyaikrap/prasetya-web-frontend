import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

import st from "styles/home.module.css";
import { categoryClicked } from "utils/homeHandler";

export default function CategoryList({ projectCat }) {
  const router = useRouter();
  useEffect(() => {
    if (router.query.cat !== undefined) {
      categoryClicked(router.query.cat, st.catListBox, st.clbOnFocus);
    }
  }, [router.query.cat]);
  //Get Category List
  const categoryList = projectCat.category
    .filter((item) => item.isActive === true)
    .map((item) => {
      return (
        <button
          key={item.id}
          id={item.id}
          className={`flex-row ${st.catListBox}`}
          onClick={(e) => {
            categoryClicked(e.currentTarget.id, st.catListBox, st.clbOnFocus);
            router.replace(
              {
                pathname: "/[lang]",
                query: {
                  lang: router.query.lang,
                  cat: e.currentTarget.id,
                },
              },
              undefined,
              { shallow: true }
            );
          }}
        >
          <span id="black-icon" style={{ display: "flex" }}>
            <Image
              layout="fill"
              objectFit="cover"
              src={item.icon1}
              alt={item.name}
            />
          </span>
          <span id="white-icon" style={{ display: "none" }}>
            <Image
              layout="fill"
              objectFit="cover"
              src={item.icon2}
              alt={item.name}
            />
          </span>
          <h4>{item.name}</h4>
        </button>
      );
    });
  return (
    <>
      <button
        id="featured"
        className={`flex-row ${st.catListBox} ${st.clbOnFocus}`}
        onClick={(e) => {
          categoryClicked(e.currentTarget.id, st.catListBox, st.clbOnFocus);
          router.replace(
            {
              pathname: "/[lang]",
              query: { lang: router.query.lang, cat: e.currentTarget.id },
            },
            undefined,
            { shallow: true }
          );
        }}
      >
        <span id="black-icon" style={{ display: "none" }}>
          <Image
            layout="fill"
            objectFit="cover"
            src="/assets/star-bl.png"
            alt="Featured"
          />
        </span>
        <span id="white-icon" style={{ display: "flex" }}>
          <Image
            layout="fill"
            objectFit="cover"
            src="/assets/star-wh.png"
            alt="Featured"
          />
        </span>
        <h4>Featured</h4>
      </button>
      {categoryList}
    </>
  );
}
