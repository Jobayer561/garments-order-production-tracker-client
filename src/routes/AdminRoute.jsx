import { Navigate } from "react-router";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import UseRole from "../hooks/UseRole";

const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = UseRole();

  if (isRoleLoading) return <LoadingSpinner />;
  if (role === "admin") return children;
  return <Navigate replace="true" />;
};

export default AdminRoute;
