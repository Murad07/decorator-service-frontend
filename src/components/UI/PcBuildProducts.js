import PcBuildProductCard from "./PcBuildProductCard";

const PcBuildProducts = ({ allProducts, catName }) => {
  return (
    <div>
      <h1>{catName}</h1>
      <div className="blog-card-container">
        {allProducts.map((product, index) => (
          <PcBuildProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default PcBuildProducts;
