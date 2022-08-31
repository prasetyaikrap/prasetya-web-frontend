import "../styles/globals.css";
import React from "react";
import AuthProvider from "context/AuthContext";

function MyApp({ Component, pageProps }) {
  const authPages = ["AdminLogin", "AdminDashboard"];
  if (authPages.includes(Component.name)) {
    return (
      <>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </>
    );
  }

  return <Component {...pageProps} />;
}

export default MyApp;
