// "use client";

// import { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";

// import Link from "next/link";

// // 카카오 지도 타입을 명시적으로 선언
// declare global {
//   interface Window {
//     kakao: any;
//   }
// }
// interface Brewery {
//   location: string;
//   title: string;
//   phone: string;
//   main: string;
//   mainImage: string;
// }
// interface MarkerData {
//   marker: kakao.maps.Marker;
//   title: string;
//   location: string;
//   phone: string;
//   main: string;
//   image: string;
// }

// export default function Page() {
//   const [visibleMarkers, setVisibleMarkers] = useState<MarkerData[]>([]);

//   useEffect(() => {
//     const createMap = () => {
//       const container = document.getElementById("map");
//       if (container && window.kakao && window.kakao.maps) {
//         const options = {
//           center: new window.kakao.maps.LatLng(36.5863, 128.1995),
//           level: 13,
//         };

//         const map = new window.kakao.maps.Map(container, options);
//         const clusterer = new window.kakao.maps.MarkerClusterer({
//           map: map,
//           averageCenter: true,
//           minLevel: 10,
//         });

//         fetch("/brewery.json")
//           .then((response) => response.json())
//           .then((data) => {
//             if (data.brewery) {
//               const geocoder = new window.kakao.maps.services.Geocoder();
//               const markerDataList: MarkerData[] = [];

//               const promises = data.brewery.map((brewery: Brewery) => {
//                 return new Promise<window.kakao.maps.Marker>((resolve) => {
//                   geocoder.addressSearch(brewery.location, (result: any[], status: string) => {
//                     if (status === window.kakao.maps.services.Status.OK) {
//                       const marker = customMarker(result[0].y, result[0].x);
//                       if (marker) {
//                         markerDataList.push({
//                           marker,
//                           title: brewery.title,
//                           location: brewery.location,
//                           phone: brewery.phone,
//                           main: brewery.main,
//                           image: brewery.mainImage,
//                         });
//                       }

//                       resolve(marker);
//                     } else {
//                       console.error(`Geocoding failed for: ${brewery.location}, status: ${status}`);
//                       resolve(null);
//                     }
//                   });
//                 });
//               });

//               Promise.all(promises).then((markers) => {
//                 const validMarkers = markers.filter(
//                   (marker): marker is window.kakao.maps.Marker => marker !== null,
//                 );
//                 clusterer.addMarkers(validMarkers);
//               });

//               const getMarkersInBounds = () => {
//                 const bounds = map.getBounds();
//                 if (bounds) {
//                   const markersInView = markerDataList.filter((item) =>
//                     bounds.contain(item.marker.getPosition()),
//                   );
//                   setVisibleMarkers(markersInView);
//                 }
//               };

//               window.kakao.maps.event.addListener(map, "idle", getMarkersInBounds);
//             } else {
//               console.error("Invalid data format:", data);
//             }
//           })
//           .catch((error) => {
//             console.error("Failed to fetch data:", error);
//           });

//         window.kakao.maps.event.addListener(clusterer, "clusterclick", function (cluster: any) {
//           const level = map.getLevel() - 1;
//           const center = cluster.getCenter();
//           map.setLevel(level, { anchor: center });
//         });
//       }
//     };

//     const loadKakaoMapScript = () => {
//       const kakaoMapScript = document.createElement("script");
//       kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY}&autoload=false&libraries=services,clusterer`;
//       kakaoMapScript.defer = true;
//       document.head.appendChild(kakaoMapScript);

//       kakaoMapScript.onload = () => {
//         if (window.kakao && window.kakao.maps) {
//           window.kakao.maps.load(createMap);
//         }
//       };

//       kakaoMapScript.onerror = () => {
//         console.error("Failed to load Kakao map script.");
//       };
//     };

//     if (window.kakao && window.kakao.maps) {
//       window.kakao.maps.load(createMap);
//     } else {
//       loadKakaoMapScript();
//     }

//     return () => {
//       const existingScript = document.querySelector(`script[src*="dapi.kakao.com/v2/maps/sdk.js"]`);
//       if (existingScript) {
//         document.head.removeChild(existingScript);
//       }
//     };
//   }, []);

//   const customMarker = (lat: number, lng: number) => {
//     if (!window.kakao || !window.kakao.maps) {
//       console.error("Kakao Maps is not loaded.");
//       return null;
//     }

//     const imageSrc = "/images/icons/icon-marker.png";
//     const imageSize = new window.kakao.maps.Size(50, 60);
//     const imageOption = { offset: new window.kakao.maps.Point(13, 42) };
//     const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

//     const markerPosition = new window.kakao.maps.LatLng(lat, lng);

//     const marker = new window.kakao.maps.Marker({
//       position: markerPosition,
//       image: markerImage,
//     });

//     return marker;
//   };

//   return (
//     <>
//       <Navbar />
//       <div id="map" className="pt-20 w-auto h-[585px]"></div>
//       <ul className="p-[25px]">
//         {visibleMarkers.map((markerData) => (
//           <li key={markerData.title} className="mb-3">
//             <Link href="/">
//               <div className="flex justify-between py-4 border border-gray rounded-xl">
//                 <div className="flex flex-col">
//                   <div className="flex flex-col ml-6 description text-gray">
//                     <h2 className="flex flex-col mb-1 text-black contentMedium">
//                       {markerData.title}
//                     </h2>
//                     {/* <Image src={`markerData.title`} /> */}
//                     <table>
//                       <tr>
//                         <td className="text-black ">주소</td>
//                         <td className="pr-1 ">|</td>
//                         <td className="overflow-hidden text-ellipsis line-clamp-1">
//                           {markerData.location}
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="text-black ">대표술</td>
//                         <td className="pr-1 ">|</td>
//                         <td className="pr-5 overflow-hidden text-ellipsis line-clamp-1">
//                           {markerData.main}
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="w-16 text-black">전화번호</td>
//                         <td className="pr-1 ">|</td>
//                         <td className="">{markerData.phone}</td>
//                       </tr>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

export default function page() {
  return <div>page</div>;
}
