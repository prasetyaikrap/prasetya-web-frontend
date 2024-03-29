//Components Import
import st from "styles/home.module.css";

import Image from "next/image";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  return (
    <section id="profile" className={`${st.profileSection}`}>
      <div className={`${st.profileBox1}`}>
        <div className={`${st.pCard}`}>
          <h2>Prasetya Ikra Priyadi</h2>
          <h3>Junior Web Developer and Technology Enthusiast</h3>
          <div className={`${st.pNavBtn}`}>
            <button
              type="button"
              onClick={(e) => {
                window.open("/profile", "_blank");
              }}
            >
              ABOUT ME
            </button>
            <button
              type="button"
              onClick={(e) => {
                router.replace("#project", undefined, { shallow: true });
              }}
            >
              PROJECTS
            </button>
            <button
              type="button"
              onClick={(e) => {
                window.open(
                  "https://drive.google.com/file/d/1QlsG-a-2a8kxtHeMj0ka3LFhh2I5wPJO/view?usp=sharing",
                  "_blank"
                );
              }}
            >
              RESUME
            </button>
          </div>
        </div>
      </div>
      <div className={`${st.profileBox2}`}>
        <div className={`${st.pImg}`}>
          <Image
            alt="Prasetya Ikra Priyadi"
            src="/assets/profile.jpg"
            objectFit="cover"
            objectPosition="top"
            layout="fill"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
}
