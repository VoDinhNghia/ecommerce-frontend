import { TypeOf, number, object, string } from "zod";
import { Iproduct, IproductRate } from "../interfaces/product.inteface";
import { API_URL, formatDate } from "../constants/constant";
import moment from "moment";

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
    minWidth: 102,
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
  dateOfManufacture: string().nonempty("dateOfManufacture is required"),
  country: string().nonempty("country is required"),
  color: string().nullable(),
  inputPower: string().nullable(),
  mainboard: string().nullable(),
  memory: string().nullable(),
  size: string().nullable(),
  warrantyExpiration: string().nonempty("warrantyExpiration is required"),
});

export type IregisterSchemaProductDetail = TypeOf<
  typeof registerSchemaProductDetail
>;

export const getAvatarProductImage = (product: Iproduct) => {
  const images = product?.images || [];
  const isAvatar = images?.find((img: { isAvatar: boolean }) => img.isAvatar)
    ?.url;
  const srcImage = isAvatar
    ? `${API_URL}/products/${isAvatar}`
    : images.length > 0
    ? `${API_URL}/products/${images[0]?.url}`
    : "";
  return srcImage;
};

export const getDiscountProduct = (product: Iproduct) => {
  const discounts = product?.discounts?.find(
    (dis: { startDate: Date; endDate: Date }) =>
      moment(new Date()).format(formatDate) >=
        moment(dis?.startDate).format(formatDate) &&
      moment(new Date()).format(formatDate) <=
        moment(dis?.endDate).format(formatDate)
  );
  return discounts;
};

export const caculatorRate = (rates: IproductRate[]) => {
  const rate =
    rates?.reduce(
      (pre: number, next: IproductRate) => pre + (next?.rate || 0),
      0
    ) / rates?.length;
  return rate;
};

export const headerDiscountTable = [
  {
    id: "index",
    label: "#",
    minWidth: 120,
  },
  {
    id: "discount",
    label: "Discount",
    minWidth: 120,
  },
  {
    id: "startDate",
    label: "StartDate",
    minWidth: 120,
  },
  {
    id: "endDate",
    label: "EndDate",
    minWidth: 120,
  },
  {
    id: "actions",
    label: "Action",
    minWidth: 102,
  },
];

export const registerSchemaProductDiscount = object({
  discount: string()
    .nonempty("discount is required")
    .transform((d) => parseInt(d))
    .pipe(number().max(100).min(0)),
  startDate: string()
    .nonempty("startDate is required")
    .transform((st) => moment(st).format(formatDate)),
  endDate: string()
    .nonempty("endDate is required")
    .transform((ed) => moment(ed).format(formatDate)),
});

export type IregisterSchemaProductDiscount = TypeOf<
  typeof registerSchemaProductDiscount
>;

export const calculatorPrice = (price = 0, discount = 0) => {
  const result = Number(price - (discount * price) / 100);
  return result;
};

export const headerReviewTable = [
  {
    id: "index",
    label: "#",
    minWidth: 120,
  },
  {
    id: "content",
    label: "Content",
    minWidth: 120,
  },
  {
    id: "createdAt",
    label: "Created At",
    minWidth: 120,
  },
  {
    id: "user",
    label: "User",
    minWidth: 120,
  },
  {
    id: "actions",
    label: "Action",
    minWidth: 102,
  },
];
