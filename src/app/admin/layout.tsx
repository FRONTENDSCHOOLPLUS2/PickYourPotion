import AdminHeader from "@/components/layout/AdminHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}
