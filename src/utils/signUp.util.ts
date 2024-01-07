import { TypeOf, object, string } from "zod";

export const registerSchemaSignUp = object({
  lastName: string().nonempty("lastName is required"),
  firstName: string().nonempty("firstName is required"),
  email: string().nonempty("email must is required"),
  password: string().nonempty("password is required"),
  mobile: string().nonempty("mobile is required"),
  address: string().nonempty("address is required"),
});

export type IregisterSchemaSignUp = TypeOf<typeof registerSchemaSignUp>;
