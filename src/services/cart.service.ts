import { Iproduct } from "../interfaces/product.inteface";
const saveLocalStorageName = "cart";

export const addTocart = (product: Iproduct, quantity = 1) => {
  const carts = getCart();
  const checkProduct = carts.find((item: Iproduct) => item.id === product.id);
  if (checkProduct) {
    checkProduct.quantity += quantity;
  } else {
    carts.push({ ...product, quantity });
  }
  localStorage.setItem(saveLocalStorageName, JSON.stringify(carts));
};

export const getCart = () => {
  const listCart = localStorage.getItem(saveLocalStorageName) || "";
  return listCart?.length > 0 ? JSON.parse(listCart) : [];
};

export const removeCart = (product: Iproduct, quantity = 1) => {
  const carts = getCart();
  const checkProduct = carts.find((item: Iproduct) => item.id === product.id);
  if (checkProduct) {
    checkProduct.quantity -= quantity;
  }
  const newCarts = carts.filter((item: Iproduct) => item.quantity > 0);
  localStorage.setItem(saveLocalStorageName, JSON.stringify(newCarts));
};

export const clearCart = () => {
  localStorage.removeItem(saveLocalStorageName);
};

export const caculatorTotalPrice = () => {
  const carts = getCart();
  const total = carts?.reduce(
    (pre: number, next: { quantity: number; price: number }) =>
      pre + next?.quantity * next?.price,
    0
  );
  return total;
};
