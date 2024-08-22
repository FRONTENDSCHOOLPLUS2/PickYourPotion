import Button from "@/components/Button";
import CartCard from "@/components/CartCard";

export default function Page() {
  const dummys = [
    { productPrice: 20000 },
    { productPrice: 30000 },
    { productPrice: 2200 },
    { productPrice: 8900 },
    { productPrice: 400000 },
  ];

  return (
    <div className="flex flex-col  mx-[25px] mt-9">
      <div className="mb-5 subTitleMedium">담은술</div>
      <div className="flex flex-col">
        <div className="h-[500px] overflow-y-auto hide-scrollbar">
          {/* {dummys.map((dummy, index) => (
            <CartCard key={index} productPrice={dummy.productPrice} />
          ))} */}
        </div>
        <div className="mt-12">
          <div className="flex content justify-between mb-[28px]">
            <span>총 상품 금액</span>
            <span>50,000원</span>
          </div>
          <div className="flex content justify-between mb-[28px]">
            <span>배송비</span>
            <span>3,000원</span>
          </div>
          <div className="flex content justify-between mb-[28px]">
            <span>총 결제 금액</span>
            <span className="text-primary contentMedium">53,000원</span>
          </div>
          <Button color={"fill"} className="w-[378px] h-[62px] subTitle">
            총 53,000원 결제하기
          </Button>
        </div>
      </div>
    </div>
  );
}
