import Image from "next/image";

import LoadingGif from "@/../public/images/loading.gif";

export default function loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image src={LoadingGif} alt="로딩 중..." />
    </div>
  );
}
