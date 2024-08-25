import { useEffect, useState } from "react";
import WrittenReviewCard from "./WrittenReviewCard";
import { Replies } from "./replies";
import { useSession } from "next-auth/react";

export default function WrittenReviewList() {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const { data: session, status } = useSession();
  const url = `${API_SERVER}/replies/`;
  const token = session?.accessToken;

  const [replies, setReplies] = useState<Replies[]>([]);

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
  return (
    <div className="flex flex-col gap-5 mb-10">
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
