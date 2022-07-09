import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Redirect() {
  const router = useRouter();
  useEffect(() => {
    const userLanguage = window.navigator.language;
    switch (userLanguage.substring(0, 2)) {
      case "id":
        router.push("/id");
        break;
      case "en":
        router.push("/en");
        break;
      default:
        router.push("/id");
    }
  });
}
