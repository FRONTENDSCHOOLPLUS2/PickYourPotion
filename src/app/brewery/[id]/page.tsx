"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
interface Brewery {
  location: string;
  title: string;
  phone: string;
  main: string;
  mainImage: string;
}

export default function Page() {
  const [data, setData] = useState<Brewery | null>(null);

  useEffect(() => {
    fetch("/brewery.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData: Brewery) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <div className="justify-center max-w-3xl">
      {data ? (
        <Image src={data.mainImage} width={428} height={450} alt="막걸리 이미지" />
      ) : (
        <p>Loading...</p>
      )}
      <div className="relative px-10 py-8 mt-[-35px] max-w-[428px] bg-white topRound topShadow">
        {data && (
          <>
            <h2>{data.title}</h2>
            <p>{data.location}</p>
            <p>{data.phone}</p>
            <p>{data.main}</p>
          </>
        )}
      </div>
    </div>
  );
}
