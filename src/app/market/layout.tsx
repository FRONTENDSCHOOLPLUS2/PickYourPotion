import Category from "@/components/Category";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Category />
      {children}
    </>
  );
}
