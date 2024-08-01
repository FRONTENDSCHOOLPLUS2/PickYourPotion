import listIcon from "@/../public/images/icons/icon-list.svg";
import cartIcon from "@/../public/images/icons/icon-cart.svg";
import accountIcon from "@/../public/images/icons/icon-accont.svg";
import Image from "next/image";
import Link from "next/link";

const MypageButton = () => {
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
      src: cartIcon,
      alt: "장바구니 아이콘",
      content: "장바구니",
      href: "/",
    },
    {
      id: 2,
      src: accountIcon,
      alt: "나의 활동 아이콘",
      content: "나의 활동",
      href: "/",
    },
  ];

  return (
    <ul className="flex mt-12 justify-between mx-auto">
      {buttonData.map((item) => (
        <li key={item.id} className="float-start bg-whiteGray rounded-[10px] px-3">
          <Link href={item.href} className="flex flex-col items-center py-1 text-darkGray">
            <Image src={item.src} alt={item.alt} />
            {item.content}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MypageButton;
