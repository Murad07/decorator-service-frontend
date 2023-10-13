import ProductCard from "./ProductCard";
import { Col, Row } from "antd";

const FeaturedProducts = ({ allProducts }) => {
  return (
    <div>
      <h1>Available Service</h1>
      <div className="blog-card-container">
        <Row gutter={[15, 15]}>
          {allProducts?.map((blog, index) => (
            <Col xs={24} sm={6} key={index} span={6}>
              <ProductCard key={index} {...blog} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default FeaturedProducts;
