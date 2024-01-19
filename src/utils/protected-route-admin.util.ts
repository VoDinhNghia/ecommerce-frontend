import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";
import { routes, userRoles } from "../constants/constant";

const ProtectedAdminRoutes = ({ children }: any) => {
  const user = getCurrentUser();
  if (user?.role === userRoles.SUPPER_ADMIN) {
    return children;
  }
  return Navigate({ to: routes.login, replace: true });
};

export default ProtectedAdminRoutes;
