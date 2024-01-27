import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";
import { routes } from "../constants/constant";

const ProtectedRoutes = ({ children, roles }: any) => {
  const user = getCurrentUser();
  if (roles?.includes(user?.role)) {
    return children;
  }
  return Navigate({ to: routes.login, replace: true });
};

export default ProtectedRoutes;
