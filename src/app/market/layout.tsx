import Category from "@/components/Category";
import Navbar from "@/components/Navbar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Category />
      {children}
    </>
  );
}
