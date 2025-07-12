import DashboardContent from "../components/DashboardContent";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSideBar from "../components/DashboardSidebar";
import DashboardContextProvider from "../context/DashboardContext";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function DashboardLayout() {
  // Get user context
  const { user } = useUserContext();

  return user ? (
    <DashboardContextProvider>
      <DashboardSideBar />
      <DashboardHeader />
      <DashboardContent>
        <Outlet />
      </DashboardContent>
    </DashboardContextProvider>
  ) : (
    <Navigate to="/home" replace />
  );
}
