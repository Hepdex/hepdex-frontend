import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <main>
      <DashboardSidebar />
      <DashboardHeader />
      <Outlet />
    </main>
  );
}
