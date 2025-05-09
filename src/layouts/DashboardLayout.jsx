import DashboardSideBar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardContent from "../components/DashboardContent";
import DashboardContextProvider from "../context/DashboardContext";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <DashboardContextProvider>
      <DashboardSideBar />
      <DashboardHeader />
      <DashboardContent>
        <Outlet />
      </DashboardContent>
    </DashboardContextProvider>
  );
}
