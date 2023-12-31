import { TypeOf, object, string } from "zod";

export const headerTableCategory = [
  {
    id: "index",
    label: "#",
    minWidth: 120,
  },
  {
    id: "name",
    label: "Name",
    minWidth: 120,
  },
  {
    id: "description",
    label: "Description",
    minWidth: 120,
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 120,
  },
];

export const registerSchemaCategory = object({
  name: string().nonempty("name is required"),
  description: string().nonempty("description is required")
});

export type IregisterCategoryInput = TypeOf<typeof registerSchemaCategory>;