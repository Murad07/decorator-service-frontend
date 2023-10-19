import { Col, Rate, Row, Image } from "antd";
import RootLayout from "@/components/Layouts/RootLayout";
import { useRouter } from "next/router";
import { useGetReviewQuery, useGetSingleServiceQuery } from "@/redux/api/api";

const ProductDetails = () => {
  const router = useRouter();
  const { productId } = router.query;

  const { data } = useGetSingleServiceQuery(productId);
  const { data: review } = useGetReviewQuery(productId);
  console.log("p: " + review?.data);
  return (
    <RootLayout>
      <div style={{ padding: 20 }} className="blog-card-container">
        <Row gutter={[15, 15]}>
          <Col xs={24} sm={12} span={12}>
            <h1>{data?.data?.title}</h1>
            <p>Category: {data?.data?.category}</p>
            <p>Status: {data?.data?.serviceStatus}</p>
            <p>Price: {data?.data?.price}</p>
            {/* <p>Individual Rating: {product.rating.individual}</p> */}
            {/* Average Rating: <Rate disabled defaultValue={data.data?.rating} /> */}
          </Col>
          <Col xs={24} sm={12} span={12}>
            <Image
              src={data?.data?.serviceImage}
              alt={data?.data?.title}
              width={250}
              height={300}
            />
          </Col>
        </Row>

        <div>
          <h3>Reviews</h3>
          {review?.data?.map((review) => (
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
              <p>Comment: {review?.reviewText}</p>
            </div>
          ))}
        </div>
      </div>
    </RootLayout>
  );
};

export default ProductDetails;
