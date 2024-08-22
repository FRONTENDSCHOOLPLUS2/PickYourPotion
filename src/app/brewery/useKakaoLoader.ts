import { useEffect } from "react";

export default function useKakaoLoader() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        console.log("Kakao Maps loaded");
      });
    };

    script.onerror = () => {
      console.error("Kakao Maps SDK failed to load.");
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);
}
