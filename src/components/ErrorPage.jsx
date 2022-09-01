import Image from "next/image";
import Link from "next/link";
import st from "styles/components.module.css";

export function Error404() {
  return (
    <section className={`${st.errorSection}`}>
      <div className={`${st.errorBox}`}>
        <div className={`${st.errorImage}`}>
          <Image
            layout="fill"
            src="/assets/error404.png"
            alt="error"
            objectFit="cover"
            priority={true}
          />
        </div>
        <p className={`bodyTitle ${st.errorMessage}`}>
          Hey, Unfortunately this page is not ready yet
        </p>
        <Link href="/">
          <a className={`bodyText ${st.homeLink}`}>Back to Homepage</a>
        </Link>
      </div>
    </section>
  );
}
