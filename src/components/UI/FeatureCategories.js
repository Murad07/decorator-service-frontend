import CategoriesCard from "./CategoriesCard";
import ProductCard from "./ProductCard";
import { Col, Row } from "antd";

const FeaturedCategories = ({ allCategories }) => {
  return (
    <div>
      <h1>Featured Categories</h1>
      <div className="blog-card-container">
        <Row gutter={[15, 15]}>
          {allCategories?.map((cat, index) => (
            <Col xs={24} sm={4} key={index} span={4}>
              <CategoriesCard cat={cat} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default FeaturedCategories;
