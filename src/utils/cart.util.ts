import { Iproduct } from "../interfaces/product.inteface";
import { getCart } from "../services/cart.service";
import {
  calculatorPrice,
  getAvatarProductImage,
  getDiscountProduct,
} from "./product.util";

export const headerTableCart = [
  {
    id: "index",
    label: "#",
    minWidth: 120,
  },
  {
    id: "image",
    label: "Image",
    minWidth: 120,
  },
  {
    id: "name",
    label: "Name",
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
    id: "actions",
    label: "Actions",
    minWidth: 102,
  },
  {
    id: "clear",
    label: "Clear",
    minWidth: 120,
  },
];

export const addToCartHomePage = (product: Iproduct) => {
  const carts = getCart();
  const srcImage = getAvatarProductImage(product);
  const checkDiscount = getDiscountProduct(product);
  const productCheck = carts?.find(
    (cart: { id: string }) => cart?.id === product?.id
  );
  const productDetail = {
    name: product?.name,
    images: srcImage,
    id: product?.id,
    price: checkDiscount
      ? calculatorPrice(product?.price, checkDiscount?.discount)
      : product?.price,
  };
  return {
    productCheck,
    productDetail,
  };
};
