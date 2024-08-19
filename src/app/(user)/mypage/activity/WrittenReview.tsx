import ReviewCardItem from "@/components/ReviewCardItem";

const MyReview: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <ReviewCardItem />
      <ReviewCardItem />
      <ReviewCardItem />
      <ReviewCardItem />
    </div>
  );
};

export default MyReview;
