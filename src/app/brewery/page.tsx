"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MovingArrow from "@/components/MovingArrow";

declare global {
  interface Window {
    kakao: any;
  }
}
interface Activity {
  activityLink: string;
  title: string;
  description: string;
  price: string;
}
interface Brewery {
  location: string;
  title: string;
  phone: string;
  main: string;
  mainImage: string;
  id: number;
  activity: Activity[];
}
interface MarkerData {
  marker: kakao.maps.Marker;
  title: string;
  location: string;
  phone: string;
  main: string;
  image: string;
  id: number;
  activity: Activity[];
}

export default function Page() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [visibleMarkers, setVisibleMarkers] = useState<MarkerData[]>([]);
  const [mapInfo, setMapInfo] = useState<boolean>(true);

  useEffect(() => {
    const loadKakaoMapScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (typeof window !== "undefined" && window.kakao && window.kakao.maps) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services,clusterer`;
        script.defer = true;

        script.onload = () => {
          if (window.kakao && window.kakao.maps) {
            window.kakao.maps.load(() => resolve());
          } else {
            reject(new Error("Kakao Maps SDK failed to load."));
          }
        };

        script.onerror = () => reject(new Error("Failed to load the Kakao Maps script."));
        document.head.appendChild(script);
      });
    };

    const createMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error("Kakao Maps SDK is not available.");
        return;
      }

      const container = mapRef.current;
      if (container) {
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
              const markerDataList: MarkerData[] = [];

              const promises = data.brewery.map((brewery: Brewery) => {
                return new Promise<globalThis.kakao.maps.Marker>((resolve) => {
                  geocoder.addressSearch(brewery.location, (result: any[], status: string) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                      const marker = customMarker(result[0].y, result[0].x);
                      if (marker) {
                        markerDataList.push({
                          marker,
                          title: brewery.title,
                          location: brewery.location,
                          phone: brewery.phone,
                          main: brewery.main,
                          image: brewery.mainImage,
                          id: brewery.id,
                          activity: brewery.activity,
                        });
                      }
                      resolve(marker);
                    } else {
                      console.error(`Geocoding failed for: ${brewery.location}, status: ${status}`);
                      resolve(null as any);
                    }
                  });
                });
              });

              Promise.all(promises).then((markers) => {
                const validMarkers = markers.filter(
                  (marker): marker is globalThis.kakao.maps.Marker => marker !== null,
                );
                clusterer.addMarkers(validMarkers);
              });

              const getMarkersInBounds = () => {
                const bounds = map.getBounds();
                if (bounds) {
                  const markersInView = markerDataList.filter((item) =>
                    bounds.contain(item.marker.getPosition()),
                  );
                  setVisibleMarkers(markersInView);
                }
              };

              window.kakao.maps.event.addListener(map, "idle", getMarkersInBounds);
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
        });
      }
    };

    const timer = setTimeout(() => {
      setMapInfo(false);
    }, 1500);
    loadKakaoMapScript()
      .then(() => {
        createMap();
      })
      .catch((error) => {
        console.error("Error loading Kakao Maps script:", error);
      });

    return () => {
      clearTimeout(timer);
      const existingScript = document.querySelector(`script[src*="dapi.kakao.com/v2/maps/sdk.js"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const customMarker = (lat: number, lng: number) => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps is not loaded.");
      return null;
    }

    const imageSrc = "/images/icons/icon-marker.png";
    const imageSize = new window.kakao.maps.Size(50, 60);
    const imageOption = { offset: new window.kakao.maps.Point(13, 42) };
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    const markerPosition = new window.kakao.maps.LatLng(lat, lng);

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    return marker;
  };

  return (
    <div className="h-full">
      <div className="mt-2 h-[400px] mx-5 round overflow-hidden relative">

        <div id="map" className="w-full h-[590px] absolute  left-0 top-0 z-[40]" ref={mapRef}></div>
        {mapInfo === true ? (
          <div className=" w-full h-[400px] inset-0 absolute z-[50] left-0 top-0 bg-black bg-opacity-80  ">
            <MovingArrow />
          </div>
        ) : null}
      </div>
      <div className="h-full p-[25px] flex flex-col items-center justify-center">
        {visibleMarkers.length === 0 ? (
          <div className="h-screen text-center text-gray-500 animate-zoomIn subTitleMedium">
            지도를 움직여
            <br />
            양조장 정보를 확인해보세요 :)
          </div>
        ) : (
          <ul className="w-full h-screen">
            {visibleMarkers.map((markerData) => (
              <li key={markerData.title} className="mb-3">
                <Link href={`/brewery/${markerData.id}`}>
                  <div className="flex justify-between border border-gray rounded-xl py-4 relative">
                    <div className="flex flex-col">
                      <div className="flex flex-col description text-gray ml-6">
                        <h2 className="flex flex-col contentMedium text-black mb-2">
                          {markerData.title}
                        </h2>
                        {markerData.activity.length > 0 && (
                          <span className="absolute text-[10px] text-primary border-primary border-[1px] w-[54px] h-[25px] p-1 flex items-center justify-center rounded-xl right-4 mb-2">
                            체험 가능
                          </span>
                        )}

                        <table>
                          <tbody>
                            <tr>
                              <td className=" text-black">주소</td>
                              <td className="pr-1">|</td>
                              <td className=" overflow-hidden text-ellipsis line-clamp-1">
                                {markerData.location}
                              </td>
                            </tr>
                            <tr>
                              <td className=" text-black">대표술</td>
                              <td className="pr-1">|</td>
                              <td className="pr-5 overflow-hidden text-ellipsis line-clamp-1">
                                {markerData.main}
                              </td>
                            </tr>
                            <tr>
                              <td className="w-16 text-black">전화번호</td>
                              <td className="pr-1">|</td>
                              <td className="">{markerData.phone}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
