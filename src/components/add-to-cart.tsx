import React, { useContext } from "react";
import { CartContext } from "../../pages/_app";

const AddToCart = ({ productId }: { productId: number }) => {
  const { data, modifyCount } = useContext(CartContext);
  const product = data.filter((item) => item.id == productId)[0];
  return (
    <div className="w-full border border-[#1d7cbf] font-bold">
      {product.count == 0 ? (
        <div
          onClick={() => {
            modifyCount(productId, product.count, 1);
            localStorage.setItem("items", JSON.stringify(data));
          }}
          className="w-full text-center text-[#1d7cbf] py-2"
        >
          Add to Cart
        </div>
      ) : (
        <div className="w-full text-center grid grid-cols-4 ">
          <div
            onClick={() => {
              modifyCount(productId, product.count, -1);
              localStorage.setItem("items", JSON.stringify(data));
            }}
            className="col-span-1 py-2 bg-[#1d7cbf] text-white flex justify-center items-center"
          >
            <div className="h-[2px] w-3 bg-white"></div>
          </div>
          <div className="col-span-2 py-2"> {product.count}</div>
          <div
            onClick={() => {
              modifyCount(productId, product.count, 1);
              localStorage.setItem("items", JSON.stringify(data));
            }}
            className="col-span-1 py-2 bg-[#1d7cbf] text-white"
          >
            +
          </div>
        </div>
      )}
    </div>
  );
};
export default AddToCart;
