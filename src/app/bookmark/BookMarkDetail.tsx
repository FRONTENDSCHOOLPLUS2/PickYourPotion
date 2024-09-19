import Image from "next/image";

interface OrderDetailProps {
  image: string;
  name: string;
  brewery?: string;
  price: number;
  quantity?: number;
  className?: string;
}

export default function BookmarkDetail({
  image,
  name,
  brewery,
  price,
  quantity,
  className,
}: OrderDetailProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src={image}
        alt={name}
        width={75}
        height={75}
        className="round w-[75px] h-[75px]"
        priority={true}
      />
      <div className="ml-3">
        <p className="text-black contentMedium">{name}</p>
        <p className="description text-gray ">{brewery}</p>
        <p className="text-[14px] font-medium">
          <span className="text-primary">{price.toLocaleString()}원</span>
        </p>
      </div>
    </div>
  );
}
