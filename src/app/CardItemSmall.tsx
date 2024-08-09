import Image from "next/image";

function CardItemSmall() {
  return (
    <div className="flex items-center">
      <Image
        src="/images/product/naru-115.jpg"
        alt="나루 생 막걸리 11.5%"
        className="rounded-lg"
        width={120}
        height={120}
      />
      <div className="ml-5">
        <h3 className="contentMedium text-black mb-1">나루 생 막걸리 11.5%</h3>
        <p className="description text-gray mb-1">한강주조</p>
        <p className="description text-gray mb-1">깊고 묵직한 단맛의 막걸리</p>
        <p className="contentMedium text-black">32,000원</p>
      </div>
    </div>
  );
}

export default CardItemSmall;
