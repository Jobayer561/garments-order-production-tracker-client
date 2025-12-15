import { Navigate } from "react-router";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import UseRole from "../hooks/UseRole";

const ManagerRoute = ({ children }) => {
  const [role, isRoleLoading] = UseRole();

  if (isRoleLoading) return <LoadingSpinner />;
  if (role === "Manager") return children;
  return <Navigate to="/" replace="true" />;
};

export default ManagerRoute;
