import Image from "next/image";
import dummy from "../../public/community-dummy.png";


export default function VerticalCard() {


  return (<div className="h-[284px] w-[182px] flex flex-col ">
    <Image src={dummy} alt="술이미지" width={182} height={180} className="round mb-3"/>
<span className="contentMedium text-[black]">나루 생 막걸리 11.5%</span>
<span className="description text-[gray]">한강주조</span>
<span className="description text-[gray]">깊고 묵직한 단맛의 막걸리</span>
<span className="contentMedium text-[black]">32,000원</span>
  </div>);
}
