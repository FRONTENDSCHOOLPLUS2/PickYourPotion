import { auth } from "@/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const paymentId = searchParams.get("paymentId");
  const transactionType = searchParams.get("transactionType");
  const txId = searchParams.get("txId");
  const session = await auth();
  const productId = Number(searchParams.get("productId"));
  const quantity = Number(searchParams.get("quantity"));
  const code = searchParams.get("code");
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const DOMAIN = process.env.NEXT_PUBLIC_API_NEXT_SERVER;

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
      return new Response("Payment failed: 결제 실패", { status: 400 });
    } else if (payment.status === "PAID") {
      await fetchOrder();
      return new Response(null, {
        status: 302,
        headers: {
          Location: `${DOMAIN}/pay/complete`,
        },
      });
    } else if (code === "FAILURE_TYPE_PG") {
      return new Response(null, {
        status: 400,
        headers: {
          Location: `${DOMAIN}/detail/${productId}`,
        },
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }

  async function fetchOrder() {
    try {
      const response = await fetch(`${API_SERVER}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
          "client-id": `${CLIENT_ID}`,
        },
        body: JSON.stringify({
          products: [
            {
              _id: productId,
              quantity: quantity,
            },
          ],
        }),
      });

      if (!response.ok) {
        // const errorText = await response.text();
        // console.error("서버 응답 오류:", errorText);
        throw new Error("주문 정보 전송에 실패했습니다.");
      }
      // console.log("주문 정보 전송 성공");
    } catch (error: any) {
      console.error("오류 발생:", error.message);
    }
  }
}
