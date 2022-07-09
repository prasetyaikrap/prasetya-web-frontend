import { createContext, useState} from "react";
import langID from 'data/langID.json'
import langEN from 'data/langEN.json'

const HomeContext = createContext();

export function HomeProvider({children}) {
  const id = {lang: 'id',data: langID}
  const en = {lang: 'en',data: langEN}
  const [language, setLanguage] = useState(id)
  const changeLanguage = (lang) => {
    switch(lang) {
      case 'id' :
        setLanguage(id);
        break;
      case 'en' :
        setLanguage(en);
        break;
      default:
        setLanguage(id);
    }
  }
  return (
    <HomeContext.Provider value={{language,changeLanguage}} >
      {children}
    </HomeContext.Provider>
  )
}

export default HomeContext;
