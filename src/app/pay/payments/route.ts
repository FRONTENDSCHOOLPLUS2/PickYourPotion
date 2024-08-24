import { auth } from "@/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const paymentId = searchParams.get("paymentId");
  const transactionType = searchParams.get("transactionType");
  const txId = searchParams.get("txId");
  const session = await auth();
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  // 로그 출력
  console.log("Payment ID:", paymentId);
  console.log("Transaction Type:", transactionType);
  console.log("Transaction ID:", txId);

  try {
    const PORTONE_API_SECRET = process.env.PORTONE_V2_SECRET;

    const paymentResponse = await fetch(`https://api.portone.io/payments/${paymentId}`, {
      method: "GET",
      headers: { Authorization: `PortOne ${PORTONE_API_SECRET}` },
    });

    if (!paymentResponse.ok) throw new Error(`paymentResponse: ${await paymentResponse.json()}`);

    const payment = await paymentResponse.json();
    console.log("Payment Status:", payment.status);

    if (payment.status === "FAILED") {
      console.log("실패~");
      return new Response("Payment failed", { status: 400 }); // 실패 시 적절한 응답
    } else {
      const fetchOrder = async () => {
        try {
          const response = await fetch(`${API_SERVER}/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.accessToken}`,
              "client-id": `${CLIENT_ID}`,
            },
            body: JSON.stringify({
              user_id: session?.user?.id,
              products: [
                {
                  _id: data._id,
                  name: data.name,
                  image: {
                    path: `/files/06-PickYourPotion/meoncheondugeonju.jpeg`,
                    name: "meoncheondugeonju.jpeg",
                    originalname: "meoncheondugeonju.jpeg",
                  },
                  quantity: data.quantity,
                  price: data.price,
                  extra: {
                    brewery: data.brewery,
                  },
                },
              ],
            }),
          });

          if (!response.ok) {
            throw new Error("주문 정보 전송에 실패했습니다.");
          }
        } catch (error: any) {
          console.error("오류 발생:", error.message);
        }
      };
      return new Response(null, {
        status: 302,
        headers: {
          Location: "http://localhost:3000/pay/complete",
        },
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
