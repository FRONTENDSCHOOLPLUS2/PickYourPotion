import { auth } from "@/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const paymentId = searchParams.get("paymentId");
  const session = await auth();
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const DOMAIN = process.env.NEXT_PUBLIC_API_NEXT_SERVER;

  const productIds = searchParams.getAll("productId").map((id) => Number(id));
  const quantities = searchParams.getAll("quantity").map((q) => Number(q));
  const products = productIds.map((id, index) => ({
    _id: id,
    quantity: quantities[index] || 1,
  }));

  const code = searchParams.get("code");

  try {
    const PORTONE_API_SECRET = process.env.PORTONE_V2_SECRET;

    const paymentResponse = await fetch(`https://api.portone.io/payments/${paymentId}`, {
      method: "GET",
      headers: { Authorization: `PortOne ${PORTONE_API_SECRET}` },
    });

    if (!paymentResponse.ok) throw new Error(`paymentResponse: ${await paymentResponse.json()}`);

    const payment = await paymentResponse.json();
    console.log("Payment Status:", payment.status);

    if (code === "FAILURE_TYPE_PG") {
      return new Response("Payment failed: 결제를 취소하였습니다.", {
        status: 302,
        headers: {
          Location: `${DOMAIN}/detail/${productIds[0]}`,
        },
      });
    }

    if (payment.status === "FAILED") {
      return new Response("Payment failed: 결제 실패", { status: 400 });
    } else if (payment.status === "PAID") {
      await fetchOrder();
      await fetchCleanUpCart();
      return new Response(null, {
        status: 302,
        headers: {
          Location: `${DOMAIN}/pay/complete`,
        },
      });
    } else {
      return new Response(null, {
        status: 400,
        headers: {
          Location: `${DOMAIN}/detail/${productIds[0]}`,
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
        body: JSON.stringify({ products }),
      });

      if (!response.ok) {
        console.error(JSON.stringify(response.json()));
        throw new Error("주문 정보 전송에 실패했습니다.");
      }
    } catch (error: any) {
      console.error("오류 발생:", error.message);
    }
  }
  async function fetchCleanUpCart() {
    try {
      const response = await fetch(`${API_SERVER}/carts/cleanup`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
          "client-id": `${CLIENT_ID}`,
        },
      });

      if (!response.ok) {
        throw new Error("장바구니 비우기를 실패하였습니다.");
      }
    } catch (error: any) {
      console.error("오류 발생:", error.message);
    }
  }
}
