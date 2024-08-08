import { ProductDetail } from "@/app/detail/[id]/page";
import Image from "next/image";

interface ProductDetailAll extends ProductDetail {
  extra: {
    taste: {
      acidity: string;
      sweet: string;
      alcohol: string;
    };
    snack: string[];
  };
}

const API_SERVER = process.env.PICK_YOUR_POTION_API_SERVER;

function Detail({ item, content }: { item: ProductDetailAll; content: string }) {
  const {
    name,
    price,
    mainImages,
    extra: { taste, snack },
  } = item;

  // 산미 당도값 받아서 width값 계산하는 함수
  const translateWidth = (tasteDegree: string) => {
    if (tasteDegree === "1") {
      tasteDegree = "w-1/4";
    } else if (tasteDegree === "2") {
      tasteDegree = "w-1/2";
    } else if (tasteDegree === "3") {
      tasteDegree = "w-3/4";
    } else if (tasteDegree === "4") {
      tasteDegree = "w-full";
    }
    return tasteDegree;
  };

  return (
    <>
      <div className="h-60 mb-3 relative bg-slate-500 rounded-lg overflow-hidden">
        <Image src={API_SERVER + mainImages[0].path} alt={name} fill />
      </div>
      <h3 className="mb-2">{name}</h3>
      <p className="mb-2 font-medium">{price.toLocaleString()}원</p>
      <table className="mb-5 w-full">
        <tbody>
          <tr>
            <td width="30%">도수</td>
            <td height="32px">{taste.alcohol}%</td>
          </tr>
          <tr>
            <td width="30%">산미</td>
            <td height="32px">
              <div className="flex flex-row gap-[1px] h-4 bg-[#FFEDC7] rounded-full overflow-hidden">
                <span
                  className={`bg-[#FDC140] ${translateWidth(taste.acidity)} h-full rounded-full`}
                ></span>
              </div>
            </td>
          </tr>
          <tr>
            <td width="30%">당도</td>
            <td height="32px">
              <div className="flex flex-row gap-[1px] h-4 bg-[#FFE2BA] rounded-full overflow-hidden">
                <span
                  className={`bg-primary ${translateWidth(taste.sweet)} h-full rounded-full`}
                ></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="mb-2 text-left">{content}</p>
      <h3 className="mb-2">어울리는 안주</h3>
      <div className="mb-8 flex flex-wrap justify-center gap-1">
        {snack.map((item, index) => (
          <p key={index} className="py-1 px-3 border-2 border-primary rounded-full">
            {item}
          </p>
        ))}
      </div>
    </>
  );
}

export default Detail;
