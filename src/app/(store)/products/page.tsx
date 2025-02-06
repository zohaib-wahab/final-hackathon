import Header from "@/components/productList-components/header";
import BestSeller from "@/components/products-components/best-seller";
import Details from "@/components/products-components/details";
import Footer from "@/components/team-components/footer";
import React from "react";

function Products() {
  return (
    <div>
        <Header />
      <Details />
      <BestSeller />
      <Footer />
    </div>
  );
}

export default Products;