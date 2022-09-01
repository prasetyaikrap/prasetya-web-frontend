import Head from "next/head";

export default function WebHead({ headProps }) {
  if (!headProps.meta) {
    headProps.meta = [];
  }
  if (!headProps.link) {
    headProps.link = [];
  }
  const { title, meta, link } = headProps;
  const metaObj = [
    { name: "viewport", content: "initial-scale=1.0, width=device-width" },
    { httpEquiv: "Content-Type", content: "text/html; charset=utf-8" },
    ...meta,
  ];
  const linkObj = [
    { rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  ];
  const metaTags = metaObj.map((item) => {
    switch (true) {
      case item.name != undefined:
        return <meta key={item.name} name={item.name} content={item.content} />;
      case item.property != undefined:
        return (
          <meta
            key={item.property}
            property={item.property}
            content={item.content}
          />
        );
      case item.httpEquiv != undefined: {
        return (
          <meta
            key={item.httpEquiv}
            httpEquiv={item.httpEquiv}
            content={item.content}
          />
        );
      }
      default:
    }
  });
  const linkTags = linkObj.map((item) => {
    return (
      <link key={item.rel} rel={item.rel} type={item.type} href={item.href} />
    );
  });
  return (
    <Head>
      <title>{title}</title>
      {metaTags}
      {linkTags}
    </Head>
  );
}
