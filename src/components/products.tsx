import Image from "next/image";
import React, { useContext, useState } from "react";
import { CartContext } from "../../pages/_app";
import AddToCart from "./add-to-cart";
import Separator from "./separator";

const TopSection = () => {
  return (
    <div className="flex flex-col text-center">
      <div className="font-bold  text-xl">Most Popular</div>
      <div className="flex items-center justify-center pt-3 md:pt-5">
        <Separator className="bg-black w-1/5" />
        <div className="relative w-7 h-7 p-1 rounded-full flex items-center justify-center bg-slate-100 mx-2">
          <Image
            src={"/star-regular.svg"}
            alt="star.svg"
            width={40}
            height={40}
          />
        </div>
        <Separator className="bg-black w-1/5" />
      </div>
    </div>
  );
};

const BottomSection = () => {
  const { data, modifyCount } = useContext(CartContext);
  return (
    <div className="flex md:flex-row flex-col items-center flex-wrap ">
      {data.map((item) => {
        const hasDiscount = !!item.original_price;
        return (
          <>
            {hasDiscount ? (
              <Card
                qty={item.count}
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                finalPrice={item.final_price}
                originalPrice={item.original_price}
                img={item.img_url}
              />
            ) : (
              <Card
                qty={item.count}
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                finalPrice={item.final_price}
                img={item.img_url}
              />
            )}
          </>
        );
      })}
    </div>
  );
};

const DiscountTag = ({ discount }: { discount: number }) => {
  return <div className="bg-black text-white">{discount}% OFF</div>;
};

const Card = ({
  qty = 0,
  id,
  name = "",
  description,
  finalPrice,
  originalPrice,
  img,
}: {
  qty: number;
  id: number;
  name: string;
  description: string;
  finalPrice: number;
  originalPrice?: number;
  img: string;
}) => {
  const calculateDiscount = () => {
    if (!!originalPrice) {
      return ((originalPrice - finalPrice) * 100) / originalPrice;
    } else {
      return 0;
    }
  };

  let productName: string | string[] = name.split(" ");
  for (let i = 0; i < productName.length; i++) {
    productName[i] =
      productName[i].charAt(0).toUpperCase() + productName[i].slice(1);
  }
  productName = productName.join(" ");

  const discount = calculateDiscount();

  return (
    <div className=" flex flex-col w-[328px] rounded-lg p-[8px]">
      <div className="w-auto h-auto flex justify-center items-center relative">
        <Image src={img} alt="" width={604} height={378} />
      </div>
      <div className="px-2 mt-2">
        <div className="flex justify-between ">
          <div>{productName}</div>
          <div className="flex space-x-4">
            {originalPrice && (
              <div className="line-through">$ {originalPrice}</div>
            )}
            <div>$ {finalPrice}</div>
          </div>
        </div>
        <div className="">{description}</div>
        <AddToCart productId={id} />
      </div>
    </div>
  );
};

const Products = () => {
  return (
    <div className="grid grid-cols-12 md:py-25 py-8">
      <div className="md:col-span-8 md:col-start-3 col-span-full px-4 md:px-0">
        <TopSection />
        <BottomSection />
      </div>
    </div>
  );
};

export default Products;
