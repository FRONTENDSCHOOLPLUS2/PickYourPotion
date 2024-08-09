import Navbar from "@/components/Navbar";
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
        {children}
      </body>
    </html>
  );
}
