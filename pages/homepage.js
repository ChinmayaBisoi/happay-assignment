import { useState } from "react";
import Products from "../src/components/products";
import TopNav from "../src/components/top-nav";

const Homepage = () => {
  return (
    <div className="text-slate-700">
      <TopNav />
      <Products />
    </div>
  );
};

export default Homepage;
