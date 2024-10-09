import Link from "next/link";
import SiteChart from "./SiteChart";
import OrderTable from "./OrderTable";
import ReviewTable from "./ReviewTable";

export default function AdminPage() {
  return (
    <main className="flex flex-col gap-5 py-7">
      <section className="border border-lightGray rounded-lg shadow-md">
        <h2 className="p-5 contentMedium border-b border-lightGray">알림함</h2>
        <ul className="flex flex-wrap gap-x-5 gap-y-3 p-5">
          <li>
            <Link href="#">
              신규주문<span className="font-medium text-primary ml-2">12</span>
            </Link>
          </li>
          <li>
            <Link href="#">
              취소관리<span className="font-medium text-primary ml-2">3</span>
            </Link>
          </li>
          <li>
            <Link href="#">
              교환/반품관리<span className="font-medium text-primary ml-2">1</span>
            </Link>
          </li>
          <li>
            <Link href="#">
              문의 답변 대기<span className="font-medium text-primary ml-2">16</span>
            </Link>
          </li>
          <li>
            <Link href="#">
              입금대기<span className="font-medium text-primary ml-2">3</span>
            </Link>
          </li>
          <li>
            <Link href="#">
              취소요청<span className="font-medium text-primary ml-2">11</span>
            </Link>
          </li>
          <li>
            <Link href="#">
              교환/반품요청<span className="font-medium text-primary ml-2">2</span>
            </Link>
          </li>
        </ul>
      </section>
      <section className="border border-lightGray rounded-lg shadow-md">
        <h2 className="p-5 contentMedium border-b border-lightGray">주문현황</h2>
        <div className="p-5">
          <OrderTable />
        </div>
      </section>
      <section className="border border-lightGray rounded-lg shadow-md">
        <h2 className="p-5 contentMedium border-b border-lightGray">사이트현황</h2>
        <div className="p-5">
          <SiteChart />
          <div className="flex justify-center gap-5 pt-3">
            <div className="before:content-[''] before:size-3 before:inline-block before:bg-primary before:rounded-full before:mr-1 before:translate-y-[1px]">
              신규주문
            </div>
            <div className="before:content-[''] before:size-3 before:inline-block before:bg-[#fabf9a] before:rounded-full before:mr-1 before:translate-y-[1px]">
              신규회원
            </div>
          </div>
        </div>
      </section>
      <section className="border border-lightGray rounded-lg shadow-md">
        <h2 className="p-5 contentMedium border-b border-lightGray">리뷰현황</h2>
        <div className="p-5">
          <ReviewTable />
        </div>
      </section>
    </main>
  );
}
