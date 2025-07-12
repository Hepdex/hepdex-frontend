import { useUserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  // User context
  const { user, isLoggedIn } = useUserContext();

  return isLoggedIn && user ? (
    <Navigate
      to={
        user.role === "employer"
          ? "/dashboard/home"
          : user.role === "candidate"
          ? "/dashboard/find-jobs"
          : "/home"
      }
      replace
    />
  ) : (
    <Outlet />
  );
}
