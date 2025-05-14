import DashboardContent from "../components/DashboardContent";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSideBar from "../components/DashboardSidebar";
import DashboardContextProvider from "../context/DashboardContext";
import { Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function DashboardLayout() {
  // Get user context
  const { user } = useUserContext();
  return (
    <DashboardContextProvider>
      {user && (
        <div>
          <DashboardSideBar />
          <DashboardHeader />
          <DashboardContent>
            <Outlet />
          </DashboardContent>
        </div>
      )}
    </DashboardContextProvider>
  );
}
