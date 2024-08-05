import Button from "@/components/Button";
import CartCard from "@/components/CartCard";

export default function Page() {
  return (
    <div className="flex flex-col  mx-[25px] mt-9">
      <div className="subTitleMedium mb-5">담은술</div>
      <div className="flex flex-col">
        <div className="h-[500px] overflow-y-auto hide-scrollbar">
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
        </div>
        <div className="mt-12">
          <div className="flex content justify-between mb-[28px]">
            <span>총 상품 금액</span>
            <span>51,000원</span>
          </div>
          <div className="flex content justify-between mb-[28px]">
            <span>배송비</span>
            <span>3,000원</span>
          </div>
          <div className="flex content justify-between mb-[28px]">
            <span>총 결제 금액</span>
            <span className="text-primary contentMedium">54,000원</span>
          </div>
          <Button
            children={`총 54,000원 결제하기`}
            selected={true}
            className="w-[378px] h-[62px] subTitle"
          />
        </div>
      </div>
    </div>
  );
}
