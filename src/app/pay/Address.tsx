import Button from "@/components/Button";
import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    daum: any;
  }
}

interface Address {
  address: string;
  zonecode: string;
}

export default function Address({
  setAddressFilled,
}: {
  setAddressFilled: (filled: boolean) => void;
}) {
  const [addrDetail, setAddrDetail] = useState<string>("");

  const onClickAddr = () => {
    new window.daum.Postcode({
      oncomplete: function (data: Address) {
        const addrInput = document.getElementById("addr") as HTMLInputElement;
        const zipNoInput = document.getElementById("zipNo") as HTMLInputElement;

        addrInput.value = data.address;
        zipNoInput.value = data.zonecode;
        document.getElementById("addrDetail")?.focus();

        setAddressFilled(!!addrDetail);
      },
    }).open();
  };

  const handleAddrDetailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAddrDetail(value);
    setAddressFilled(!!value);
  };

  useEffect(() => {
    setAddressFilled(false); // 컴포넌트가 마운트될 때 주소 입력 상태 초기화
  }, [setAddressFilled]);

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
              onClick={onClickAddr}
              className="border-b-[1px] border-lightGray py-2 focus:outline-none focus:border-primary"
            />
            <input
              id="addr"
              type="text"
              placeholder="주소"
              readOnly
              onClick={onClickAddr}
              className="border-b-[1px] border-lightGray py-2 focus:outline-none focus:border-primary"
            />
            <input
              id="addrDetail"
              type="text"
              placeholder="상세주소"
              value={addrDetail}
              onChange={handleAddrDetailChange}
              className="border-b-[1px] border-lightGray py-2 focus:outline-none focus:border-primary"
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
