import RootLayout from "@/components/Layouts/RootLayout";
import Banner from "@/components/UI/Banner";
import FeaturedCategories from "@/components/UI/FeatureCategories";
import AvailableServices from "@/components/UI/AvailableServices";
import UpcomingServices from "@/components/UI/UpcomingServices";
// import fetch from "node-fetch";

const HomePage = ({ allProducts, allCategories }) => {
  return (
    <RootLayout>
      <Banner />
      <AvailableServices allProducts={allProducts} />
      <UpcomingServices allProducts={allProducts} />

      <FeaturedCategories allCategories={allCategories} />
    </RootLayout>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  // if (typeof window === "undefined") {
  //   return {
  //     props: {
  //       allProducts: [],
  //       allCategories: [],
  //     },
  //   };
  // }
  // const res = await fetch(`${process.env.URL}/api/pcbuild`); // internal API connected with mongoDB
  const res = await fetch(`${process.env.URL}/products`); // --> json server
  const data = await res.json();

  const resCat = await fetch(`${process.env.URL}/categories`); // --> json server
  let dataCat = await resCat.json();

  // console.log(dataCat.data);
  dataCat = dataCat.data.slice(0, 6);

  // Shuffle the array of products
  const shuffledProducts = shuffleArray(data.data);

  // Get the first 6 products from the shuffled array
  const randomProducts = shuffledProducts.slice(0, 6);
  // console.log(dataCat);

  return {
    props: {
      allProducts: randomProducts,
      allCategories: dataCat,
      // allNews: data.data, // when using internal API connected with mongoDB
    },
    revalidate: 30,
  };
};

// Function to shuffle an array using the Fisher-Yates algorithm
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};
