import DashboardTitle from "../components/DashboardTitle";
import EmployerDashboardContent from "../ui/dashboard/EmployerDashboardContent";
import { useUserContext } from "../context/UserContext";
import { capitalizeFirst } from "../utils/helpers";

export default function Dashboard() {
  // User context
  const { user } = useUserContext();
  return (
    <div>
      <DashboardTitle
        title={`Hello, ${capitalizeFirst(user.firstName)} ${capitalizeFirst(
          user.lastName
        )} 👋`}
        subtitle="What would you like to do today?"
        links={[{ name: "Dashboard" }]}
      />
      {user.role === "employer" && <EmployerDashboardContent />}
    </div>
  );
}
