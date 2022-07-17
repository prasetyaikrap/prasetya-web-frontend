import Image from "next/image"
import st from "styles/projects.module.css"
import CatList from "pages/projects/CatList"

export default function CatHeader({projectCat}) {
  const catList = projectCat.category.filter(item => {
    return item.isActive === true
  })
  return (
    <div className={`flex-row ${st.headerContainer}`}>
      <div>
        <CatList 
        catList={catList} 
        />
      </div>
      <div>
        <span className={`${st.hSearchIcon}`}>
          <Image 
          src="/assets/search.png"
          alt='Search Project'
          layout='fill'
          objectFit='cover'
          />
        </span>
        <input id="projectSearch" className={st.hSearchBox} type="search" name="projectSearch" />
      </div>
    </div>
  )
}