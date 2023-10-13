import RootLayout from "@/components/Layouts/RootLayout";
import PcBuildProducts from "@/components/UI/PcBuildProducts";

const ProductCategory = ({ product, catName }) => {
  console.log(product);
  return (
    <RootLayout>
      <PcBuildProducts allProducts={product} catName={catName} />
    </RootLayout>
  );
};

export default ProductCategory;

export const getServerSideProps = async (context) => {
  // if (typeof window === "undefined") {
  //   return {
  //     props: {
  //       product: [],
  //       catName: [],
  //     },
  //   };
  // }
  const { params } = context;
  const res = await fetch(`${process.env.URL}/products`);
  const data = await res.json();
  const allProducts = data.data;

  const resCat = await fetch(
    `${process.env.URL}/categories?catId=${params.catId}`
  );
  const dataCat = await resCat.json();
  const catName = dataCat.data.name;

  const filteredProducts = allProducts?.filter(
    (product) => product.catId === params.catId
  );

  //   console.log(data);

  return {
    props: {
      product: filteredProducts,
      catName: catName,
    },
  };
};
