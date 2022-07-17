import st from "styles/projects.module.css"
import {filterCategory} from "utils/Handler"
import { useRouter } from "next/router"

export default function CatList({catList}) {
  const router = useRouter()
  const classes = [st.hCategoryBox,st.hCategoryBoxFocus];
  if(router.query.category !== undefined) {
    filterCategory(router.query.category,classes);
  }
  const generateCategory = catList.map(item => {
    return (
      <button 
      key={item.id} 
      id={item.id} 
      className={`bodyText flex ${st.hCategoryBox}`} 
      onClick={e => {
        filterCategory(e.currentTarget.id,classes)
        router.push({
          pathname: "/[lang]/projects",
          query: {lang: router.query.lang,category: e.currentTarget.id,}
        },undefined,{shallow: true})
        }}>
        {item.name}
      </button>
    )
  })
  return (
    <>
      <button 
      id="all"
      className={`bodyText flex ${st.hCategoryBox} ${st.hCategoryBoxFocus}`} 
      onClick={e => {
        filterCategory(e.currentTarget.id,classes);
        router.push({
          pathname: "/[lang]/projects",
          query: {lang: router.query.lang,category: e.currentTarget.id,}
        },undefined,{shallow: true})
        }}>
        All
      </button>
      <button 
      id="featured"
      className={`bodyText flex ${st.hCategoryBox}`} 
      onClick={e => {
        filterCategory(e.currentTarget.id,classes);
        router.push({
          pathname: "/[lang]/projects",
          query: {lang: router.query.lang,category: e.currentTarget.id,}
        },undefined,{shallow: true})
        }}>
        Featured
      </button>
      {generateCategory}
    </>
  )
}