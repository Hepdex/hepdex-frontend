import DashboardTitle from "../components/DashboardTitle";
import DashboardContent from "../ui/dashboard/DashboardContent";
import { useUserContext } from "../context/UserContext";
import { capitalizeFirst } from "../utils/helpers";

export default function Dashboard() {
  // User context
  const { user } = useUserContext();

  return (
    <>
      <DashboardTitle
        title={`Hello, ${capitalizeFirst(user.firstName)} ${capitalizeFirst(
          user.lastName
        )} 👋`}
        subtitle="What would you like to do today?"
        links={[{ name: "Dashboard" }]}
      />
      {user.role === "employer" && <DashboardContent />}
    </>
  );
}
