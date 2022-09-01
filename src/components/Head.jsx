import Head from "next/head";

export default function WebHead({ headProps }) {
  const { title, meta, link } = headProps;
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <link
        key="shortcut icon"
        rel="shortcut icon"
        type="image/x-icon"
        href="/favicon.ico"
      />
      <link key="icon" rel="icon" type="image/x-icon" href="/favicon.ico" />
      {meta &&
        meta.map((item) => {
          switch (true) {
            case item.property != undefined:
              return (
                <meta
                  key={item.name}
                  property={item.property}
                  content={item.content}
                />
              );
            case item.name != undefined:
              return (
                <meta key={item.name} name={item.name} content={item.content} />
              );
            default:
          }
        })}
      {link &&
        link.map((item) => {
          return (
            <link
              key={item.rel}
              rel={item.rel}
              type={item.type}
              href={item.href}
            />
          );
        })}
    </Head>
  );
}
