import TanstackProvider from "@/provider/tanstackProvider";
import "./globals.css";
import Header from "@/components/layout/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="pt-12">
        <Header />
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
