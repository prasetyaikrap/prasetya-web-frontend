import Footer from "./Footer";
import WebHead from "./Head";
import Navbar from "./Navbar";

export function PublicLayout({
  children,
  headProps,
  navbarProps,
  footerProps,
}) {
  return (
    <>
      <WebHead headProps={headProps} />
      <Navbar navbarProps={navbarProps} />
      {children}
      <Footer footerProps={footerProps} />
    </>
  );
}

export function AdminLayout() {}
