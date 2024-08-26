import listIcon from "@/../public/images/icons/icon-list.svg";
import likeIcon from "@/../public/images/icons/icon-like.svg";
import reviewIcon from "@/../public/images/icons/icon-review.svg";
import Image from "next/image";
import Link from "next/link";

const MyPageButton = () => {
  const buttonData = [
    {
      id: 0,
      src: listIcon,
      alt: "주문 내역 아이콘",
      content: "주문내역",
      href: "/order",
    },
    {
      id: 1,
      src: likeIcon,
      alt: "찜 아이콘",
      content: "찜",
      href: "/cart",
    },
    {
      id: 2,
      src: reviewIcon,
      alt: "리뷰 아이콘",
      content: "리뷰",
      href: "/mypage/activity",
    },
  ];

  return (
    <ul className="flex mt-12 justify-evenly mx-auto">
      {buttonData.map((item) => (
        <li
          key={item.id}
          className="float-start bg-whiteGray rounded-[10px] px-3 w-[90px] cursor-pointer"
        >
          <Link href={item.href} className="flex flex-col items-center py-1 text-darkGray">
            <Image
              src={item.src}
              alt={item.alt}
              width={40}
              height={40}
              className="w-[40px] h-[40px]"
              priority={true}
            />
            {item.content}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MyPageButton;
