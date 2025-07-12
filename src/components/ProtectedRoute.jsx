import React from "react";
import { useUserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles, children }) {
  // User context
  const { user } = useUserContext();

  return user && allowedRoles.includes(user.role) ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <Navigate
      to={
        user?.role === "employer"
          ? "/dashboard/home"
          : user?.role === "candidate"
          ? "/dashboard/find-jobs"
          : "/home"
      }
      replace
    />
  );
}
