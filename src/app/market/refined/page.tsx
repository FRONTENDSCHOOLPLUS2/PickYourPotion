import MyPageCard from "@/components/MyPageCard";
import VerticalCard from "@/components/VerticalCard";

export default function Page() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <VerticalCard />
      <MyPageCard />
    </div>
  );
}
