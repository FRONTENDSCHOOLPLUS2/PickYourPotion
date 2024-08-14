"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { mPlusRounded1C } from "../fonts";

function Splash() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4001);
    return () => clearTimeout(timer);
  });

  return (
    <>
      {showSplash && (
        <div className="animate-[fadeout_1s_ease-in_3s_forwards] fixed top-0 left-0 w-screen h-screen flex justify-center items-center gap-5 bg-ivory text-primary">
          <div className="text-center">
            <p
              className={twMerge(
                `opacity-0 font-bold text-8xl mb-4 ${mPlusRounded1C.className}`,
                "animate-[moving-top_0.3s_ease-in-out_0.3s_forwards]",
              )}
            >
              調
            </p>
            <p
              className={twMerge(
                "opacity-0 text-3xl",
                "animate-[moving-top_0.3s_ease-in-out_0.6s_forwards]",
              )}
            >
              <span className="text-[#ffb487]">고를</span>
              <span className="font-bold"> 조</span>
            </p>
          </div>
          <div className="text-center">
            <p
              className={twMerge(
                `opacity-0 font-bold text-8xl mb-4 ${mPlusRounded1C.className}`,
                "animate-[moving-top_0.3s_ease-in-out_1s_forwards]",
              )}
            >
              持
            </p>
            <p
              className={twMerge(
                "opacity-0 text-3xl",
                "animate-[moving-top_0.3s_ease-in-out_1.3s_forwards]",
              )}
            >
              <span className="text-[#ffb487]">가질</span>
              <span className="font-bold"> 지</span>
            </p>
          </div>
          <div className="text-center">
            <p
              className={twMerge(
                `opacity-0 font-bold text-8xl mb-4 ${mPlusRounded1C.className}`,
                "animate-[moving-top_0.3s_ease-in-out_1.8s_forwards]",
              )}
            >
              酒
            </p>
            <p
              className={twMerge(
                "opacity-0 text-3xl",
                "animate-[moving-top_0.3s_ease-in-out_2.1s_forwards]",
              )}
            >
              <span className="text-[#ffb487]">술</span>
              <span className="font-bold"> 주</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Splash;
