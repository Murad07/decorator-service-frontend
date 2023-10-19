import { Col, Rate, Row, Image, Spin, Form, Button, Input } from "antd";
import RootLayout from "@/components/Layouts/RootLayout";
import { useRouter } from "next/router";
import {
  useAddReviewMutation,
  useGetReviewQuery,
  useGetSingleServiceQuery,
} from "@/redux/api/api";
import { useState } from "react";

const ProductDetails = () => {
  const router = useRouter();
  const { productId } = router.query;

  const {
    data: serviceData,
    isLoading: serviceIsLoading,
    isError: serviceIsError,
  } = useGetSingleServiceQuery(productId);
  const {
    data: reviewData,
    isLoading: reviewIsLoading,
    isError: reviewIsError,
  } = useGetReviewQuery(productId);

  const [form] = Form.useForm();

  const [submitting, setSubmitting] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const [addReview] = useAddReviewMutation();

  const handleReviewSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      const newReview = {
        decoratorService: productId,
        reviewText: values.comment,
        rating: values.rating,
      };

      await addReview(newReview);
      setReviewText("");
      setRating(0);
      form.resetFields();
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setSubmitting(false);
    }
  };
  if (serviceIsLoading || reviewIsLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (serviceIsError || reviewIsError) {
    return <div>Error loading data.</div>;
  }

  const productDetails = serviceData?.data;
  const productReviews = reviewData?.data;

  return (
    <RootLayout>
      <div style={{ padding: 20 }} className="blog-card-container">
        <Row gutter={[15, 15]}>
          <Col xs={24} sm={12} span={12}>
            <h1>{productDetails?.title}</h1>
            <p>Category: {productDetails?.category}</p>
            <p>Status: {productDetails?.serviceStatus}</p>
            <p>Price: {productDetails?.price}</p>
            {/* <p>Individual Rating: {product.rating.individual}</p> */}
            {/* Average Rating: <Rate disabled defaultValue={data.data?.rating} /> */}
          </Col>
          <Col xs={24} sm={12} span={12}>
            <Image
              src={productDetails?.serviceImage}
              alt={productDetails?.title}
              width={250}
              height={300}
            />
          </Col>
        </Row>

        <div>
          <h3>Submit Review</h3>
          <Form form={form} onFinish={handleReviewSubmit}>
            <Form.Item
              name="comment"
              rules={[{ required: true, message: "Please enter your review." }]}
            >
              <Input.TextArea
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here"
              />
            </Form.Item>
            <Form.Item
              name="rating"
              rules={[{ required: true, message: "Please select a rating." }]}
            >
              <Rate value={rating} onChange={(value) => setRating(value)} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Submit Review
              </Button>
            </Form.Item>
          </Form>

          <h3>Reviews</h3>
          {productReviews?.map((review) => (
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
