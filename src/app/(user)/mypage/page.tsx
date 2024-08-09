import MyPageButton from "./MyPageButton";
import MyPageList from "./MyPageList";

export default function MyPage() {
  return (
    <main className="px-10">
      <div className="px-3">
        <h1 className="mt-[114px] text-2xl font-medium">조지주님</h1>
        <p className="text-2xl font-medium">안녕하세요👋🏻</p>
      </div>
      <MyPageButton />
      <MyPageList />
    </main>
  );
}
