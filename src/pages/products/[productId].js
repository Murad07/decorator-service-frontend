import { Card, Col, Rate, Row } from "antd";
import Image from "next/image";
import RootLayout from "@/components/Layouts/RootLayout";

const ProductDetails = ({ product }) => {
  console.log(product);
  return (
    <RootLayout>
      <div style={{ padding: 20 }} className="blog-card-container">
        <Row gutter={[15, 15]}>
          <Col xs={24} sm={12} span={12}>
            <h1>{product?.name}</h1>
            <p>Category: {product?.category}</p>
            <p>Status: {product?.status}</p>
            <p>Price: {product?.price}</p>
            {/* <p>Individual Rating: {product.rating.individual}</p> */}
            Average Rating: <Rate disabled defaultValue={product?.rating} />
          </Col>
          <Col xs={24} sm={12} span={12}>
            <Image
              src={product?.image_url}
              alt={product?.name}
              width={250}
              height={300}
            />
          </Col>
        </Row>

        <div>
          <h3>Description: </h3>
          <p>{product?.description}</p>

          <h3>Key Features</h3>
          <ul>
            {product?.key_features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <h3>Reviews</h3>
          {product?.reviews.map((review) => (
            <div
              key={review.id}
              style={{
                border: "1px solid gray",
                borderRadius: 5,
                margin: 5,
                padding: 5,
              }}
            >
              <h4>{review.user}</h4>
              Individual Rating: <Rate disabled defaultValue={review?.rating} />
              <p>Comment: {review?.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </RootLayout>
  );
};

export default ProductDetails;

export const getServerSideProps = async (context) => {
  // if (typeof window === "undefined") {
  //   return {
  //     props: {
  //       product: [],
  //     },
  //   };
  // }

  const { params } = context;
  const res = await fetch(
    `${process.env.URL}/products?pId=${params.productId}`
  );
  const data = await res.json();
  console.log(data.data);

  return {
    props: {
      product: data.data,
    },
  };
};
