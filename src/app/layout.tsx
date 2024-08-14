import TanstackProvider from "@/provider/TanstackProvider";
import "./globals.css";
import Header from "@/components/layout/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="pt-14">
        <Header />
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
