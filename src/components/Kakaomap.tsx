"use client";

import { useEffect } from "react";
import Image from "next/image"; // Next.js Image 컴포넌트 사용

// 이미지 import
import markerImg from "../../public/images/icons/icon-marker.png";

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

        fetch("/brewery.json")
          .then((response) => response.json())
          .then((data) => {
            if (data.brewery) {
              const geocoder = new window.kakao.maps.services.Geocoder();
              const promises = data.brewery.map((brewery: { location: string }) => {
                return new Promise((resolve) => {
                  geocoder.addressSearch(brewery.location, (result: any, status: any) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                      const marker = customMarker(result[0].y, result[0].x);
                      resolve(marker);
                    } else {
                      console.error(`Geocoding failed for: ${brewery.location}, status: ${status}`);
                      resolve(null);
                    }
                  });
                });
              });

              Promise.all(promises).then((markers) => {
                const validMarkers = markers.filter((marker) => marker !== null);
                clusterer.addMarkers(validMarkers);
              });
            } else {
              console.error("Invalid data format:", data);
            }
          })
          .catch((error) => {
            console.error("Failed to fetch data:", error);
          });

        window.kakao.maps.event.addListener(clusterer, "clusterclick", function (cluster: any) {
          const level = map.getLevel() - 1;
          const center = cluster.getCenter();
          map.setLevel(level, { anchor: center });
          setTimeout(() => {
            map.panTo(center);
          }, 300);
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

  const customMarker = (lat: number, lng: number) => {
    const imageSrc = markerImg.src; // Import한 이미지 URL 설정
    const imageSize = new window.kakao.maps.Size(40, 48); // 마커 이미지의 크기
    const imageOption = { offset: new window.kakao.maps.Point(13, 42) }; // 마커 이미지에서 좌표를 지정합니다.
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    const markerPosition = new window.kakao.maps.LatLng(lat, lng);

    // 마커 생성
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    return marker; // 마커를 반환
  };

  return <div id="map" className="pt-20 w-auto h-[585px]"></div>;
}
