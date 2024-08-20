import { useEffect, useState } from "react";
import WrittenReviewCard from "./WrittenReviewCard";
import { Replies } from "./replies";

export default function WrittenReviewList() {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${API_SERVER}/replies/`;
  const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  const [replies, setReplies] = useState<Replies[]>([]);

  useEffect(() => {
    // 리뷰 내역 불러오기
    const getReviewList = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            "client-id": `${CLIENT_ID}`,
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        console.log(result);

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
  }, [url, CLIENT_ID, token]);
  return (
    <div className="flex flex-col gap-12">
      {replies.map((reply) => (
        <WrittenReviewCard
          key={reply._id}
          createdAt={reply.createdAt}
          product={reply.product}
          content={reply.content}
        />
      ))}
    </div>
  );
}
