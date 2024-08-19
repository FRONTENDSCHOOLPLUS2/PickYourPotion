import Image from "next/image";
import dummy from "../../../../public/community-dummy.png";

export default function Page() {
  return (
    <div className="scrollbar-hide">
      <Image src={dummy} alt="양조장 대표 이미지" />
      <div></div>
    </div>
  );
}
