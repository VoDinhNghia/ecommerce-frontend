import { Iproduct } from "../interfaces/product.inteface";

export const addTocart = (product: Iproduct, quantity = 1) => {
  const carts = getCart();
  if (product?.id) {
    const newItem = {
      id: product?.id,
      price: product?.price,
      images: product?.images,
      name: product?.name,
      quantity,
    };
    if (carts.length > 0) {
      const checkItem = carts.find(
        (item: { id: string }) => item.id === newItem.id
      );
      if (checkItem) {
        for (const item of carts) {
          if (item.id === newItem.id) {
            item.quantity += quantity;
          }
        }
      } else {
        carts.push(newItem);
      }
    } else {
      carts.push(newItem);
    }
    localStorage.setItem("cart", JSON.stringify(carts));
  }
};

export const getCart = () => {
  const listCart = localStorage.getItem("cart") || "";
  return listCart?.length > 0 ? JSON.parse(listCart) : [];
};

export const removeCart = (product: Iproduct, quantity = 1) => {
  const carts = getCart();
  const newCarts = [];
  for (const item of carts) {
    if (item?.id === product?.id) {
      item.quantity -= quantity;
      if (item.quantity > 0) {
        newCarts.push(item);
      }
    } else {
      newCarts.push(item);
    }
  }
  localStorage.setItem("cart", JSON.stringify(newCarts));
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};

export const calculatorTotal = () => {
  const carts = getCart();
  const total = carts?.reduce(
    (pre: number, next: { quantity: number; price: number }) =>
      pre + next?.quantity * next?.price,
    0
  );
  return total;
};
