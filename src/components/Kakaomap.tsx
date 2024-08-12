"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Kakaomap() {
  useEffect(() => {
    const createMap = () => {
      const container = document.getElementById("map");

      // 도큐먼트에 map id를가진 요소 생성
      if (container && window.kakao && window.kakao.maps) {
        const options = {
          center: new window.kakao.maps.LatLng(36.5863, 128.1995),
          //문경을 기준으로 초기 맵이미지 생성
          level: 13,
        };
        new window.kakao.maps.Map(container, options);
      }
    };

    const loadKakaoMapScript = () => {
      const kakaoMapScript = document.createElement("script");
      kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY}&autoload=false`;
      kakaoMapScript.defer = true;

      document.head.appendChild(kakaoMapScript);

      kakaoMapScript.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(createMap);
        }
      };
    };

    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(createMap);
    } else {
      loadKakaoMapScript();
    }

    return () => {
      const existingScript = document.querySelector(`script[src*="dapi.kakao.com/v2/maps/sdk.js"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return <div id="map" className="pt-20 w-auto h-[585px]"></div>;
}
