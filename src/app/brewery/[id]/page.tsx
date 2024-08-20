"use client";

import Image from "next/image";
import dummy from "../../../../public/community-dummy.png";
import Link from "next/link";

import location from "../../../../public/images/icons/icon-location.png";
import globe from "../../../../public/images/icons/icon-globe.png";
import teller from "../../../../public/images/icons/icon-teller.png";

export default function Page() {
  // useEffect(() => {
  //   fetch("/brewery.json").then((response) => response.json())
  //   .then(result);
  // }, []);

  const activity = [
    {
      title: "우리술",
      location: "경기 가평군 하면 대보간선로 26",
      phone: "031-585-8525",
      link: "http://www.woorisool.kr",
      alwaysvisit: true,
      reservation: false,
      visitcount: 2350,
      number: 3,
      main: "가평잣 생 막걸리",
      content:
        "끊임없는 도전으로 막걸리의 세계화를 위해 노력하는 우리술, 어느 안주에나 어울리는 깔끔한 막걸리 맛을 유지하겠습니다. 어디서나 막걸리를 즐길 수 있도록 다양한 연구를 하겠습니다.",
      activity: [
        {
          activityLink: "https://www.woorisool.kr/brewery",
          title: "막걸리 공장 견학 및 막걸리 시음 + 선물 증정",
          description:
            "우리술 막걸리 생산 공장은 경기도내 가장 큰 규모로 일일 최대 10만리터, 연간 3만톤을 생산하고 있습니다. 막걸리업계 내 최초로 HACCP을 인증 받은 제 2공장의 생산모습과 지금도 더 좋은 품질을 위해 매일 품질검사와 연구를 거듭하는 연구실의 모습도 직접 확인해보세요!",
          price: "10,000",
        },
        {
          activityLink: "https://www.woorisool.kr/brewery",
          title: "막걸리 공장 견학 및 막걸리 빚기 체험 그리고 다양한 막걸리 시음 ",
          description:
            "막걸리의 제조과정을 배우고 직접 나만의 막걸리를 담가보는 특별한 체험을 경험해보세요. 우리술이 생산하는 다양한 종류의 막걸리(쌀, 잣, 고구마, 땅콩, 옥수수)를 직접 시음해보실 수 있는 시간도 준비되어있습니다. 추가로 막걸리 선물 세트는 덤!",
          price: "30,000",
        },
      ],
      mainImage: "https://newsimg.sedaily.com/2023/05/25/29PPTIU4EZ_2.jpg",
    },
  ];
  return (
    <>
      <div className="justify-center h-[428px] w-full overflow-hidden relative">
        <Image src={dummy} width={428} height={450} alt="막걸리 이미지" className="absolute" />
        <div className="absolute bottom-14 left-7 pl-200 ">
          <div className="flex flex-col">
            <span className="text-white drop-shadow-custom-light text-[38px] font-bold tracking-5percent-tight">
              신평 양조장
            </span>
            <span className="text-white drop-shadow-custom-light mt-[-6px]">
              충남 당진시 신평면 신평로 813
            </span>
          </div>
        </div>
      </div>
      <div className="relative px-8 py-[52px] mt-[-35px]  max-w-[428px] bg-white topRound topShadow">
        <div className="flex flex-row justify-between">
          <h1 className="flex items-center titleMedium">양조장 소개</h1>
        </div>
        <p className="black text-ellipsis mt-2.5 text-sm leading-lineHeight tracking-5percent-tight">
          대한민국 우리 술 품평회 과실주 대상 2회 수상, 아시아 와인 트로피 7연속 메달 수상, 대한민국
          주류 대상 6연속 대상 수상, 2022년 대통령 취임식 만찬주 등 화려한 수상 경력을 갖고
          있습니다. 가족이 함께 운영하고 있으며, 브랜드 샤토미소의 이름처럼 사람들의 미소와 함께 한
          잔의 감동으로 기쁨의 미소를 드리고 싶은 샤토미소와인입니다.
        </p>
        <table className="mt-3">
          <tbody className="contentMedium">
            <tr className="mt-1">
              <td className="pr-1 black">대표술</td>
              <td>:</td>
              <td className="pl-1 text-slate-900 content tracking-5percent-tight">
                복순도가, 느린마을
              </td>
            </tr>
            <tr className="mt-1">
              <td className=" pr-1 black">전화번호</td>
              <td>:</td>
              <td className="pl-1 text-slate-900 content tracking-5percent-tight">010-2944-3793</td>
            </tr>
          </tbody>
        </table>
        <ul className="flex flex-row justify-between mt-5">
          <li className="flex border round py-3 px-4 ">
            <Link href={activity[0].location} className="flex flex-row items-center justify-center">
              <Image src={location} alt="" width={24} height={24} className="p-1" />
              <span className="flex text-[14px] ml-1">지도보기</span>
            </Link>
          </li>
          <li className="flex border round py-3 px-4 ">
            <Link href={activity[0].link} className="flex  items-center justify-center">
              <Image src={globe} alt="" width={24} height={24} className="p-1" />
              <span className="flex text-[14px] ml-1">홈페이지</span>
            </Link>
          </li>
          <li className="flex border round py-3 px-4 items-center justify-center">
            <Link
              href={`tel:${activity[0].phone}`}
              className="flex flex-row items-center justify-center"
            >
              <Image src={teller} alt="" width={24} height={24} className="p-1" />
              <span className="flex text-[14px] ml-1">전화걸기</span>
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col space-y-8 mt-12">
          {activity.map((item, index) => (
            <li key={index} className="flex flex-col mt-3">
              {item.activity.map((act, subIndex) => (
                <div key={subIndex} className="mb-10 border w-full py-6 px-7 rounded-[20px]">
                  <span className="subTitleMedium">{act.title}</span>
                  <p className="text-sm mt-3 leading-lineHeight tracking-5percent-tight">
                    {act.description}
                  </p>
                  <span className="flex justify-end mt-3 contentMedium">{act.price}원</span>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
