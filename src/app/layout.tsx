import TanstackProvider from "@/provider/TanstackProvider";
import "./globals.css";
import Header from "@/components/layout/Header";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChannelTalkManager from "./ChannelTalkManager";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://nextlevel.fesp.shop"),

  title: {
    default: "조지주 | 전통주 스토어",
    template: "%s | 조지주",
  },
  description: "당신이 원하는 술을 찾아드립니다.",
  keywords: ["전통주", "만취", "막걸리", "청주", "약주", "한식"],
  authors: [{ name: "FESP 2기" }],
  openGraph: {
    title: "조지주에 오신걸 환영합니다.",
    description: "당신이 원하는 술을 찾아드립니다.",
    images: "https://pick-your-potion.vercel.app/images/jojiju-meta.png",
    url: "https://pick-your-potion.vercel.app/",
    type: "website",
    siteName: "PickYourPotion",
  },
};

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
          <div className="">
            <Header />
            <SessionProvider>
              <TanstackProvider>
                <ToastContainer />
                <ChannelTalkManager order={orderList.ok === 1 && orderList?.item[0]} />
                {children}
              </TanstackProvider>
            </SessionProvider>
          </div>
        </body>
      </html>
    </>
  );
}
