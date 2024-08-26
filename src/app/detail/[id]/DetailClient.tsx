"use client";
import Image from "next/image";
import { useEffect } from "react";
import Detail from "./Detail";
import Reply from "./Reply";
import { fetchDetail } from "./page";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Buying from "./Buying";
import AddCart from "./AddCart";
import { useProductStore } from "@/zustand/Store";
import DegreeBar from "@/components/DegreeBar";
export default function DetailClient() {
  let { id } = useParams();
  const { data } = useQuery({
    queryKey: ["detail", id],
    queryFn: () => fetchDetail(id as string),
  });
  let content;
  let category = data?.extra.category[0];
  const { setId, showDetail, setShowDetail, setName, setPrice, setImage, setBrewery, setAlcohol } =
    useProductStore((state) => ({
      setId: state.setId,
      showDetail: state.showDetail,
      setShowDetail: state.setShowDetail,
      setName: state.setName,
      setPrice: state.setPrice,
      setImage: state.setImage,
      setBrewery: state.setBrewery,
      setAlcohol: state.setAlcohol,
    }));
  if (data) {
    if (showDetail) {
      content = <Detail data={data} />;
    } else {
      content = <Reply data={data} />;
    }
  }
  switch (category) {
    case "PC01":
      category = "막걸리";
      break;
    case "PC02":
      category = "청주/약주";
      break;
    case "PC03":
      category = "증류주";
      break;
    case "PC04":
      category = "과실주";
      break;
    case "PC05":
      category = "기타";
      break;
    default:
      category = "기타";
  }

  useEffect(() => {
    if (data) {
      setName(data?.name);
      setPrice(data?.price);
      setBrewery(data?.extra?.brewery);
      setId(data?._id);
      setImage(data?.mainImages[0].path);
      setAlcohol(data?.extra?.taste?.alcohol);
    }
  }, [data]);

  return (
    <>
      {data && (
        <div className="flex items-center justify-center">
          <Image
            src={`https://api.fesp.shop${data?.mainImages[0]?.path}`}
            width={430}
            height={450}
            alt="술 이미지"
            priority={true}
            className="object-contain w-full h-auto"
          />
        </div>
      )}

      <div className="relative py-8 mt-[-35px] max-w-full bg-white topRound topShadow shadow-2xl">
        <div className="flex flex-col justify-between px-10">
          <p className="content text-darkGray text-ellipsis ">{data?.extra.brewery}</p>
          <h1 className="flex items-center titleMedium">{data?.name}</h1>
          <p className="mt-1 contentMedium text-ellipsis">{data?.price.toLocaleString()}원</p>
        </div>

        <div className="flex flex-row justify-between px-10 mt-2">
          <div className="w-[105px] h-[64px] flex flex-col items-center justify-center bg-ivory round gap-1 ">
            <span className="text-black contentMedium">주종</span>
            <p className="description text-gray ">{category}</p>
          </div>

          <div className="w-[105px] h-[64px] flex flex-col items-center justify-center bg-ivory round gap-1">
            <span className="text-black contentMedium ">도수</span>
            <p className="description text-gray">{data?.extra.taste.alcohol}도</p>
          </div>
          <div className="w-[105px] h-[64px] flex flex-col items-center justify-center bg-ivory round gap-1">
            <span className="text-black contentMedium">용량</span>
            <p className="description text-gray">{data?.extra.volume}ml</p>
          </div>
        </div>
        <div className="p-3 px-10 mt-4">
          <p className="contentMedium t">테이스팅 그래프</p>
          <div className="px-10 py-6 mt-5 border-2 border-lightGray round bg-[#fbfbfb]">
            <table className="w-full text-darkGray">
              <tbody className="">
                <tr className="mt-10">
                  <td width="30%">당도</td>
                  <td height="34px">
                    <DegreeBar degree={data?.extra.taste.sweet} color="#FF8F4B" />
                  </td>
                </tr>
                <tr className="mt-10">
                  <td width="30%">산미</td>
                  <td height="34px" className="mt-1">
                    <DegreeBar degree={data?.extra.taste.acidity} color="#FF8F4B" />
                  </td>
                </tr>
                <tr>
                  <td width="30%">바디감</td>
                  <td height="34px">
                    <DegreeBar degree={data?.extra.taste.body} color="#FF8F4B" />
                  </td>
                </tr>
                <tr>
                  <td width="30%">씁쓸함</td>
                  <td height="34px">
                    <DegreeBar degree={data?.extra.taste.bitter} color="#FF8F4B" />
                  </td>
                </tr>
                <tr>
                  <td width="30%">탄산</td>
                  <td height="34px">
                    <DegreeBar degree={data?.extra.taste.sparkle} color="#FF8F4B" />
                  </td>
                </tr>
                <tr>
                  <td width="30%">소비기한</td>
                  <td height="34px">{data?.extra.useByDate}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-2 px-10 mt-5 round top-shadow">
          <button
            className={`contentMedium w-full h-[52px] flex items-center justify-center cursor-pointer  transition-colors  round ${
              showDetail ? "bg-primary text-white " : "bg-whiteGray text-black"
            }`}
            onClick={() => setShowDetail(true)}
          >
            상세설명
          </button>
          <button
            className={`contentMedium w-full h-[52px] flex items-center  justify-center cursor-pointer transition-colors round ${
              !showDetail ? "bg-primary text-white" : "bg-whiteGray text-black"
            }`}
            onClick={() => setShowDetail(false)}
          >
            후기
          </button>
        </div>

        <div>{content}</div>
      </div>
      <div className="sticky bottom-0 z-20 flex justify-center gap-3 px-10 py-4 mt-5 bg-white left-6 bottomShadow">
        <AddCart data={data} />
        <Buying />
      </div>
    </>
  );
}
