import EditorsPics from "@/components/home-components/editors-pics";
import FeatureProducts from "@/components/home-components/feature-products";
import FeauresPosts from "@/components/home-components/feature-posts";
import Hero from "@/components/home-components/hero";
import Header from "@/components/home-components/header";
import Footer from "@/components/home-components/footer";

export default function Home() {
  return (
    <>
        <Header />
      <Hero />
      <EditorsPics />
      <FeatureProducts />
      <FeauresPosts />
      <Footer />
    </>
  );
}
