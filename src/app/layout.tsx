import TanstackProvider from "@/provider/TanstackProvider";
import "./globals.css";
import Header from "@/components/layout/Header";
import { SessionProvider } from "next-auth/react";
import ChannelTalkManager from "./ChannelTalkManager";
import { auth } from "@/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

  const session = await auth();
  const getOrderList = async () => {
    const res = await fetch(`${API_SERVER}/orders?limit=1`, {
      headers: {
        "client-id": CLIENT_ID,
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    return res.json();
  };

  const orderList = await getOrderList();

  return (
    <>
      <html lang="ko">
        <head>
          <script
            type="text/javascript"
            src="https://code.jquery.com/jquery-1.12.4.min.js"
            defer
          ></script>
          <script src="https://cdn.iamport.kr/v1/iamport.js" defer />
        </head>
        <body className="pt-14">
          <Header />
          <SessionProvider>
            <TanstackProvider>
              <ChannelTalkManager order={orderList.item[0]} />
              {children}
            </TanstackProvider>
          </SessionProvider>
        </body>
      </html>
    </>
  );
}
