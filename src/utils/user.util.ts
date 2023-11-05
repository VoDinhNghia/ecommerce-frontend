import { object, string, TypeOf } from "zod";
import { IuserInfo } from "../interfaces/login.interface";

export const headersUserTable = () => {
  const headers = [
    {
      id: "index",
      label: "#",
      minWidth: 170,
    },
    {
      id: "name",
      label: "Name",
      minWidth: 170,
    },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
    },
    {
      id: "code",
      label: "Code",
      minWidth: 170,
    },
    {
      id: "role",
      label: "Role",
      minWidth: 170,
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 170,
    },
  ];
  return headers;
};

export const handleDataUserTable = (listUsers = []) => {
  const data = listUsers?.map((user: IuserInfo, index: number) => {
    return {
      id: user?.id,
      index: index + 1,
      name: `${user?.lastName} ${user?.middleName} ${user?.firstName}`,
      email: user?.email,
      code: user?.code,
      role: user?.role,
    };
  });
  return data;
};

export const registerSchemaUpdatePasswordForm = object({
  currentPassword: string().nonempty("currentPass must is provided"),
  newPassword: string().nonempty("newPassword must is provided").min(6),
  confirmPassword: string().nonempty("confirmPassword must is provided").min(6),
}).refine((data) => data?.newPassword === data.confirmPassword, {
  message: "confirmPassword don't match",
  path: ["confirmPassword"],
});

export type IregisterInputUpdatePassordForm = TypeOf<
  typeof registerSchemaUpdatePasswordForm
>;
