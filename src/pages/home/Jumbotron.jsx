//Components Import
import st from "styles/home.module.css";

import Image from "next/image";
import Link from "next/link";

export function ProfileJumbotron(props) {
  return (
    <div className={`${st.container} flex`}>
      <div className={`${st.box1} flex`}>
        <div className={`${st.profileBox}`}>
          <p className={`${st.pHeadline2}`}>Hi, selamat datang...</p>
          <h2 className={`${st.pHeadline1}`}>Prasetya Ikra Priyadi</h2>
          <p className={`${st.pHeadline2}`}>
            Tuan rumah{" "}
            <Link href="/">
              <a className={`${st.keyWordSpinnov}`}>SPINNOV.ID</a>
            </Link>
          </p>
          <p className={`${st.pHeadline3} ${st.pSubHeadline1}`}>
            &quot;...Home for every Technology Enthusiast...&quot;
          </p>
          <div className={`${st.pBtnBox}`}>
            <button>Karya dan Publikasi</button>
            <button>Full Resume</button>
          </div>
        </div>
      </div>
      <div className={`${st.box2} flex`}>
        <div className={`${st.imgProfileBox}`}>
          <Image
            alt="Prasetya Ikra Priyadi"
            src="/assets/profile.jpg"
            objectFit="cover"
            layout="fill"
            priority="true"
            className={`${st.imgProfile}`}
          />
        </div>
      </div>
    </div>
  );
}
