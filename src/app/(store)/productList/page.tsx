import Cards from "@/components/productList-components/cards";
import Company from "@/components/productList-components/company";
import Header from "@/components/productList-components/header";
import Hero from "@/components/productList-components/hero";
import Footer from "@/components/team-components/footer";

const ProductPage = () => {
  return (
    <div>
        <Header />
      <Hero />
      <Company />
      <Cards />
      <Footer />
    </div>
  );
};

export default ProductPage;
