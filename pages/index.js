import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Redirect() {
  const router = useRouter();
  useEffect(() => {
    const userLanguage = window.navigator.language;
    switch (userLanguage.substring(0, 2)) {
      case "id":
        router.replace("/id");
        break;
      case "en":
        router.replace("/en");
        break;
      default:
        router.replace("/id");
    }
  });
}
