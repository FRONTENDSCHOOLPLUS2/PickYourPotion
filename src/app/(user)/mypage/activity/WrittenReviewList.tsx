import { useEffect, useState } from "react";
import WrittenReviewCard from "./WrittenReviewCard";
import { Replies } from "./replies";
import { useSession } from "next-auth/react";
import Pagination from "@/components/Pagination"; // 공통 컴포넌트 가져오기

export default function WrittenReviewList() {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const { data: session, status } = useSession();
  const url = `${API_SERVER}/replies/`;
  const token = session?.accessToken;

  const [replies, setReplies] = useState<Replies[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // 한 페이지에 보여줄 리뷰 수

  useEffect(() => {
    if (status === "authenticated") {
      const getReviewList = async () => {
        try {
          const response = await fetch(url, {
            headers: {
              "client-id": `${CLIENT_ID}`,
              Authorization: `Bearer ${token}`,
            },
          });

          const result = await response.json();

          if (response.ok) {
            setReplies(result.item);
          } else {
            console.log(result.message);
          }
        } catch (error) {
          console.error("네트워크 오류 발생", error);
        }
      };

      getReviewList();
    }
  }, [url, CLIENT_ID, session, status]);

  // 페이지 변경 핸들러
  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  // 현재 페이지에 맞는 데이터를 슬라이스해서 가져오기
  const offset = currentPage * itemsPerPage;
  const currentItems = replies.slice(offset, offset + itemsPerPage);

  return (
    <div className="flex flex-col gap-5 mb-10">
      {/* 현재 페이지에 해당하는 리뷰들만 표시 */}
      {currentItems.map((reply) => (
        <WrittenReviewCard
          key={reply._id}
          createdAt={reply.createdAt}
          product={reply.product}
          content={reply.content}
        />
      ))}

      {/* 공통 페이지네이션 컴포넌트 사용 */}
      <Pagination
        pageCount={Math.ceil(replies.length / itemsPerPage)} // 총 페이지 수
        onPageChange={handlePageChange} // 페이지 변경 시 실행
      />
    </div>
  );
}
