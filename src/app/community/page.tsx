import Link from "next/link";

export default function page() {
  return (
    <main className="min-w-80 p-10 flex justify-center">
      <div className="w-80  border-2 border-rose-600">
        {/* <image src="" /> */}
        <p>이미지</p>
        <h1>생막걸리</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it
        </p>
        <p className="font-bold">추천 안주</p>
        <p className="">소고기 육전</p>
        <p>파전</p>
        <p>칼국수</p>
        <p>해당 상품</p>
        <Link href="#">
          <p>이미지</p>
          <p>생막걸리</p>
          <span className="border-">
            <p className="text-gray">17도</p>
          </span>
          <p className="text-gray">양조장</p>
          <p className="text-gray">가격</p>
        </Link>
      </div>
    </main>
  );
}
