const cartItems: any[] = [];

export const useCart = () => {
  const addItem = (item: {
    id: string;
    title: string;
    price: number;
    quantity: number;
  }) => {
    cartItems.push(item);
    console.log("Cart updated:", cartItems);
  };

  return { addItem };
};
