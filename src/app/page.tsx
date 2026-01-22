import Image from "next/image";
import ProductList from "../components/ProductList";
import { Suspense } from "react";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="relative aspect-3/1 mb-12">
        <Image
          src="/featured.png"
          alt="Featured Product"
          fill
          loading="eager"
        ></Image>
      </div>
      <ProductList category={category} params="homepage"/>
    </Suspense>
  );
};

export default Home;
