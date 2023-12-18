import { TypeOf, number, object, string } from "zod";

export const headerProductTable = [
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
    id: "price",
    label: "Price",
    minWidth: 120,
  },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 120,
  },
  {
    id: "category",
    label: "Category",
    minWidth: 120,
  },
  {
    id: "detail",
    label: "Detail",
    minWidth: 120,
  },
  {
    id: "rate",
    label: "Rate",
    minWidth: 120,
  },
  {
    id: "review",
    label: "Review",
    minWidth: 120,
  },
  {
    id: "discount",
    label: "Discount",
    minWidth: 120,
  },
  {
    id: "image",
    label: "Image",
    minWidth: 120,
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 120,
  },
];

export const registerSchemaProduct = object({
  name: string().nonempty("name must is required"),
  description: string().nonempty("description must is required"),
  price: string()
    .nonempty("price must is required")
    .transform((p) => parseFloat(p))
    .pipe(number().max(10000000000).min(0)),
  quantity: string()
    .nonempty("quantity must is required")
    .transform((q) => parseInt(q))
    .pipe(number().max(10000000).min(0)),
  categoryId: string().nonempty("categoryId must is required"),
});

export type IregisterSchemaProduct = TypeOf<typeof registerSchemaProduct>;

export const registerSchemaProductDetail = object({
  dateOfManufacture: string().nullable(),
  country: string().nullable(),
  color: string().nullable(),
  inputPower: string().nullable(),
  mainboard: string().nullable(),
  memory: string().nullable(),
  size: string().nullable(),
  warrantyExpiration: string().nullable(),
});

export type IregisterSchemaProductDetail = TypeOf<
  typeof registerSchemaProductDetail
>;
