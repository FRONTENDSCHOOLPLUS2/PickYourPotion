"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import BookMarkDetail from "./BookMarkDetail";
import BookMarkButton, { getBookmark } from "../detail/[id]/BookMarkButton";

export interface ImageProps {
  path: string;
  name: string;
  originalname: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  mainImages: ImageProps[];
}

interface Bookmark {
  _id: string;
  product: Product;
}

export default function BookmarkList({ token }: { token: string | undefined }) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;

  const { data: book } = useQuery<Bookmark[]>({
    queryKey: ["book"],
    queryFn: () => getBookmark(token),
  });

  return (
    <div className="m-6">
      <h1 className="subTitleMedium">찜한 상품 목록</h1>
      {book &&
        book.map((v) => (
          <ul key={v._id} className="mt-0 flex flex-col ">
            <li className="flex justify-between items-center space-x-4 p-2 mt-3 border border-lightGray round p-3 ">
              <Link href={`detail/${v.product._id}`}>
                <BookMarkDetail
                  image={`${API_SERVER}${v?.product?.mainImages[0]?.path}`}
                  name={v?.product.name}
                  price={v?.product.price}
                />
              </Link>
              <BookMarkButton
                productId={v.product._id}
                token={token}
                className="relative left-1 top-1"
              />
            </li>
          </ul>
        ))}
    </div>
  );
}
