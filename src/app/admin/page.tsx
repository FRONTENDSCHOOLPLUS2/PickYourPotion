import Button from "@/components/Button";
import Link from "next/link";

export default function AdminPage() {
  return (
    <main>
      <div className="flex flex-col gap-3 mt-10">
        <Button>가입한 회원 정보</Button>
        <Button>등록한 상품 정보</Button>
        <Link href={"/admin/register"} className="w-full">
          <Button className="w-full">상품 등록</Button>
        </Link>
      </div>
    </main>
  );
}
