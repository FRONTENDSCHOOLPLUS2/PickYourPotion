import React from "react";
import ReactPaginate from "react-paginate";
import "@/components/pagination.css";

interface PaginationProps {
  pageCount: number; // 총 페이지 수
  onPageChange: (selectedPage: number) => void; // 페이지 변경 시 호출되는 함수
}

export default function Pagination({ pageCount, onPageChange }: PaginationProps) {
  // 페이지 변경 핸들러
  const handlePageClick = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected);
    // 페이지를 클릭할 때 페이지의 최상단으로 스크롤
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 스크롤을 부드럽게 이동
    });
  };

  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      pageCount={pageCount}
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
  );
}
