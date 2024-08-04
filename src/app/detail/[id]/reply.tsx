import Image from "next/image";
import iconLike from "../../../../public/images/icons/icon-like.svg";
import dummyImage from "../../../../public/community-dummy.png";
export default function Reply() {
  return (
    <div className="pt-5 pb-5 border-y-[0.5px] border-gray">
      <form>
        <input />
        <button type="submit">전송</button>
      </form>
      <div className="flex flex-row justify-between ">
        <p className="subTitleMedium">혈중 알콜농도 면허 취소</p>
        <button>
          <Image src={iconLike} width={25} height={22} alt="찜하기" />
        </button>
      </div>
      <div className="flex flex-row">
        <p className="description text-darkGray">@alcholfreeindechihae</p>
        <p className="description text-darkGray">2020년 10월 21일</p>
      </div>
      <p className="leading-5 description text-darkGray">
        어제 이 술마시고 오늘 저녁에 운전하다가 면허 취소 당했어요... 하지만 정말 맛은 좋고 끝에
        달달한 맛이 너무 달콤 합니다. 다들 이거 마시고 행복한 연애 하세요 ㅎㅎ 맛꿀마
      </p>
      <Image src={dummyImage} width={348} height={228} alt="막걸리 이미지" />
    </div>
  );
}
