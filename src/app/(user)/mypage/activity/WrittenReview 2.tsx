import MyPageCard from "@/components/MyPageCard";

const MyReview: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <MyPageCard />
      <MyPageCard />
      <MyPageCard />
      <MyPageCard />
    </div>
  );
};

export default MyReview;
