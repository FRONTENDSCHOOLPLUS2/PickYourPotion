import { useEffect, useState } from "react";
import WrittenReviewCard from "./WrittenReviewCard";
import { Replies } from "./replies";
import { useSession } from "next-auth/react";
import ReactPaginate from "react-paginate";
import "@/components/pagination.css";

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
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
    // 페이지를 클릭할 때 페이지의 최상단으로 스크롤
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 스크롤을 부드럽게 이동
    });
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

      {/* 페이지네이션 컴포넌트 */}
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={Math.ceil(replies.length / itemsPerPage)} // 총 페이지 수
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick} // 페이지 변경 시 실행
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        disabledClassName={"disabled"}
      />
    </div>
  );
}
