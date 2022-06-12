import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";

interface ICartData {
  id: number;
  name: string;
  description: string;
  original_price?: number;
  final_price?: number;
  img_url: string;
  count?: number;
}

const cartData = [
  {
    id: 1,
    name: "food card",
    description: "This card is used for spending on Food merchants",
    final_price: 21,
    original_price: 30,
    img_url:
      "https://react-coding-assignment.s3.ap-south-1.amazonaws.com/cards/orange_card.png",
  },
  {
    id: 2,
    name: "travel card",
    description: "This card is used for spending on Travel and hotel bookings",
    final_price: 20,
    img_url:
      "https://react-coding-assignment.s3.ap-south-1.amazonaws.com/cards/blue_card.png",
  },
  {
    id: 3,
    name: "epic card",
    description: "Use this card and get benefits on every transaction",
    final_price: 40,
    img_url:
      "https://react-coding-assignment.s3.ap-south-1.amazonaws.com/cards/golden_card.png",
  },
  {
    id: 4,
    name: "happay premium card",
    description: "Use this card and get benefits on every transaction",
    final_price: 40,
    img_url:
      "https://react-coding-assignment.s3.ap-south-1.amazonaws.com/cards/black_card.png",
  },
];

export const CartContext = createContext(null);
function MyApp({ Component, pageProps }: AppProps) {
  const [data, setData] = useState<ICartData[] | []>([]);

  function modifyCount(id: number, price: number, value: number) {
    let newVal = 0;
    if (price + value < 0) {
      newVal = price;
    } else {
      newVal = price + value;
    }
    let temp = data.map((item) => {
      if (item.id == id) item.count = newVal;
      return item;
    });
    setData(temp);
  }
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    if (items) {
      setData(items);
    } else {
      const temp = cartData.map((item) => {
        return { ...item, count: 0 };
      });

      setData(temp);
      localStorage.setItem("items", JSON.stringify(temp));
    }
  }, []);

  return (
    <CartContext.Provider value={{ data, modifyCount }}>
      <Component {...pageProps} />
    </CartContext.Provider>
  );
}

export default MyApp;
