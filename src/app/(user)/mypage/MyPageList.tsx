import Image from "next/image";
import arrowIcon from "@/../public/images/icons/icon-arrow-right.svg";

const MyPageList: React.FC = () => {
  const list = ["취소/환불 내역", "회원 정보", "1:1 쳇봇 상담", "고객센터", "로그아웃"];

  return (
    <ul className="mt-10 mb-24 px-3">
      {list.map((item) => (
        <li className="flex justify-between text-black py-3.5" key={list.indexOf(item)}>
          <span className="pt-1">{item}</span>
          <Image src={arrowIcon} alt="화살표 아이콘" width={20} />
        </li>
      ))}
    </ul>
  );
};

export default MypageList;
