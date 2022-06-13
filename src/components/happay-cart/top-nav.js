import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { CartContext } from "../../pages/_app";

const TopNav = () => {
  const { data } = useContext(CartContext);
  const totalItems = data.reduce((acc, curr) => {
    return (acc += curr.count);
  }, 0);
  const logoUrl =
    "https://react-coding-assignment.s3.ap-south-1.amazonaws.com/cards/blue_logo.svg";
  return (
    <div className="bg-slate-100 py-4 grid grid-cols-12 px-4 md:px-0">
      <div className="md:col-span-10 md:col-start-2 col-span-full flex justify-between items-center">
        <Link href="/homepage">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-6 h-6 md:w-9 md:h-9 relative">
              <Image
                src={logoUrl}
                alt="happay-logo.svg"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="text-[#1d7cbf] text-2xl">Happay</div>
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href={"/cart-page"}>
            <div className="cursor-pointer relative w-8 h-8 p-1 rounded-full flex items-center justify-center bg-slate-100 mx-2">
              <Image src={"/cart.svg"} alt="cart.svg" width={40} height={40} />
              {!!totalItems && (
                <div className="z-10 absolute top-0 text-sm right-0 w-4 text-center rounded-full bg-red-300">
                  {totalItems}
                </div>
              )}
            </div>
          </Link>
          <div>Profile</div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
