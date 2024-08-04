import Image from "next/image";
import detailDummy from "../../../../public/detail_dummy.png";
export default function Detail() {
  return (
    <>
      <div className="my-5">
        <Image src={detailDummy} width={428} height={450} alt="막걸리 이미지" />
      </div>
    </>
  );
}
