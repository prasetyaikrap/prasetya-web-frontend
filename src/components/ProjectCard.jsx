import st from "styles/components.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ProjectCards({
  projectData,
  href,
  shallow = false,
  replace = false,
}) {
  const router = useRouter();
  const cards = projectData.map((item) => {
    let url = "";
    url = href.replace("[CAT]", router.query.cat);
    url = href.replace("[PID]", item.id);
    return (
      <div key={item.id} id={item.id} className={`flex-column ${st.projCard}`}>
        <div className={`${st.pcImg}`}>
          <Image
            layout="fill"
            src={item.imageUrl}
            alt={item.title}
            objectFit="cover"
          />
        </div>
        <div className={`flex ${st.pcTitle}`}>
          <Link href={url} replace={replace} shallow={shallow}>
            <h5 style={{ cursor: "pointer" }}>{item.title}</h5>
          </Link>
        </div>
      </div>
    );
  });
  return cards;
}
