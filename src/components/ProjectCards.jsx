import Image from "next/image";
import Link from "next/link";
import st from "styles/components.module.css";
import { useRouter } from "next/router";

export default function ProjectCards({ projectData, rowsData }) {
  const router = useRouter();
  const cards = projectData.map((item) => {
    return (
      <div key={item.id} className={`flex-column ${st.pCardContainer}`}>
        <div className={`flex-column ${st.pCardImage}`}>
          <Image
            layout="fill"
            src={item.imageUrl}
            alt={item.title}
            objectFit="cover"
          />
          <div className={`${st.pCardDesc}`}>
            <p className={`smallText`}>{item.description}</p>
          </div>
        </div>
        <div className={`flex-row ${st.pCardTitle}`}>
          <Link href={`/${router.query.lang}/projects?pid=${item.id}`}>
            <h4 style={{ cursor: "pointer" }}>{item.title}</h4>
          </Link>
        </div>
      </div>
    );
  });
  if (projectData.length % rowsData !== 0) {
    const emptyCard = rowsData - (projectData.length % rowsData);
    for (let i = 1; i <= emptyCard; i++) {
      cards.push(
        <div
          key={"empty" + i}
          className={`flex-column ${st.pCardContainerEmpty}`}
        ></div>
      );
    }
  }
  return cards;
}
