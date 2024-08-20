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
    <html lang="ko">
      <body className="pt-14">
        <Header />
        <SessionProvider>
          <TanstackProvider>{children}</TanstackProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
