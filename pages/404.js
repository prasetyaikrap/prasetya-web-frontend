import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  const errorBox = {
    display: "flex",
    flexDirection: "column",
    width: "40%",
    height: "30vw",
    rowGap: "1vw",
    justifyContent: "center",
    alignItems: "center",
  };
  const errorImage = {
    position: "relative",
    width: "17vw",
    height: "17vw",
  };
  const homeLink = {
    backgroundColor: "var(--col-navy-dark)",
    color: "var(--col-white-primary)",
    textDecoration: "none",
    padding: ".5vw 1vw",
    borderRadius: ".3vw",
  };
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={errorBox}>
        <div style={errorImage}>
          <Image
            layout="fill"
            src="/assets/error404.png"
            alt="error"
            objectFit="cover"
          />
        </div>
        <p className={`bodyTitle`}>
          Hey, Unfortunately this page is not ready yet
        </p>
        <Link href="/">
          <a style={homeLink} className={`bodyText`}>
            Back to Homepage
          </a>
        </Link>
      </div>
    </section>
  );
}
