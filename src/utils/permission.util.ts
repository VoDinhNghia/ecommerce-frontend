import { userRoles } from "../constants/constant";
import { getCurrentUser } from "../services/auth.service";

export const validateRoleSa = () => {
  const currentUser = getCurrentUser();
  const isRoleSa = currentUser?.role === userRoles.SUPPER_ADMIN;
  return isRoleSa;
};
