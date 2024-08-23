import TanstackProvider from "@/provider/TanstackProvider";
import "./globals.css";
import Header from "@/components/layout/Header";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            <TanstackProvider>{children}</TanstackProvider>
          </SessionProvider>
        </body>
      </html>
    </>
  );
}
