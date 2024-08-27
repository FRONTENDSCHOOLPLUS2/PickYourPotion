"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import LoadingGif from "@/../public/images/loading.gif";

export default function Loading() {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      {showLoading && <Image src={LoadingGif} alt="로딩 중..." />}
    </div>
  );
}
