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
      if (container && window.kakao && window.kakao.maps) {
        const options = {
          center: new window.kakao.maps.LatLng(36.5863, 128.1995),
          level: 13,
        };

        const map = new window.kakao.maps.Map(container, options);

        const clusterer = new window.kakao.maps.MarkerClusterer({
          map: map,
          averageCenter: true,
          minLevel: 10,
        });

        fetch("/chicken.json")
          .then((response) => response.json())
          .then((data) => {
            if (data.positions) {
              const markers = data.positions.map((position: { lat: number; lng: number }) => {
                return new window.kakao.maps.Marker({
                  position: new window.kakao.maps.LatLng(position.lat, position.lng),
                });
              });

              clusterer.addMarkers(markers);
            } else {
              console.error("Invalid data format:", data);
            }
          })
          .catch((error) => {
            console.error("Failed to fetch data:", error);
          });

        // 클러스터 클릭 이벤트 추가
        window.kakao.maps.event.addListener(clusterer, "clusterclick", function (cluster: any) {
          // 현재 지도 레벨에서 1레벨 확대한 레벨
          const level = map.getLevel() - 1;

          const center = cluster.getCenter();

          // 레벨을 먼저 변경
          map.setLevel(level, { anchor: center });

          // 레벨 변경 후 일정 시간 대기 후에 부드럽게 이동
          setTimeout(() => {
            map.panTo(center);
          }, 300); // 약간의 지연을 두어 애니메이션 효과를 부각
        });
      }
    };

    const loadKakaoMapScript = () => {
      const kakaoMapScript = document.createElement("script");
      kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY}&autoload=false&libraries=services,clusterer`;
      kakaoMapScript.defer = true;
      document.head.appendChild(kakaoMapScript);

      kakaoMapScript.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(createMap);
        }
      };

      kakaoMapScript.onerror = () => {
        console.error("Failed to load Kakao map script.");
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
