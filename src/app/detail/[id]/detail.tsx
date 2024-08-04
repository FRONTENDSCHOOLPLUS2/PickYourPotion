import Image from "next/image";
import detailDummy from "../../../../public/detail_dummy.png";
export default function Detail() {
  return (
    <>
      <div className="my-5">
        <Image src={detailDummy} width={428} height={450} alt="막걸리 이미지" />
      </div>
      <div>
        <div className="fixed bottom-0 flex flex-row gap-3 py-6 mt-5 mb-5 bg-white left-6 round">
          <button
            className={`contentMedium w-[124px] h-[62px] flex items-center justify-center cursor-pointe bg-whiteGray text-darkGray round`}
          >
            술바구니
            <br /> 추가
          </button>
          <button
            className={`contentMedium w-[244px] h-[62px] flex items-center  justify-center cursor-pointer bg-primary text-white round `}
          >
            구매하기
          </button>
        </div>
      </div>
    </>
  );
}
