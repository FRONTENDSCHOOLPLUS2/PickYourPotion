"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
    map: any;
  }
}
export default function Kakaomap() {
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        let container = document.getElementById("map");
        let options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        let map = new window.kakao.maps.Map(container, options);
      });
      return;
    }

    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.defer = true;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        let container = document.getElementById("map");
        let options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        let map = new window.kakao.maps.Map(container, options);
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);

    return () => {
      kakaoMapScript.removeEventListener("load", onLoadKakaoAPI);
    };
  }, []);

  return <div id="map" className="pt-20 w-screen h-[585px]"></div>;
}
