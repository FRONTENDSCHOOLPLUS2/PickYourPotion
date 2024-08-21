import Button from "@/components/Button";
import Script from "next/script";

declare global {
  interface Window {
    daum: any;
  }
}

interface Address {
  address: string;
  zonecode: string;
}

export default function Address() {
  const onClickAddr = () => {
    new window.daum.Postcode({
      oncomplete: function (data: Address) {
        (document.getElementById("addr") as HTMLInputElement).value = data.address;
        (document.getElementById("zipNo") as HTMLInputElement).value = data.zonecode;
        document.getElementById("addrDetail")?.focus();
      },
    }).open();
  };
  return (
    <div className="py-2">
      <span className="contentMedium">주소(필수)</span>
      <div className="flex justify-between mt-10">
        <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />

        <div className="w-full mr-5">
          <div className="flex flex-col gap-4 content">
            <input
              id="zipNo"
              type="text"
              placeholder="우편번호"
              readOnly
              className="border-b-[1px] border-lightGray py-2"
            />
            <input
              id="addr"
              type="text"
              placeholder="주소"
              readOnly
              onClick={onClickAddr}
              className="border-b-[1px] border-lightGray py-2"
            />
          </div>
        </div>
        <Button onClick={onClickAddr} className="w-20 h-12">
          검색
        </Button>
      </div>
    </div>
  );
}
