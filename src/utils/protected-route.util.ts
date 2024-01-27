import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";
import { routes } from "../constants/constant";

const ProtectedRoutes = ({ children, roles, isPermission }: any) => {
  const user = getCurrentUser();
  if (roles?.includes(user?.role)) {
    if (!isPermission) {
      return Navigate({ to: routes.forbiden, replace: true });
    }
    return children;
  }
  return Navigate({ to: routes.forbiden, replace: true });
};

export default ProtectedRoutes;
