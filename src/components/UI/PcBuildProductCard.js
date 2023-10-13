import Image from "next/image";
import { Button, Col, Divider, Rate, Row } from "antd";
import { useDispatch } from "react-redux";
import { addToPcBuild } from "@/redux/features/pcbuildSlice";
import { useRouter } from "next/router";

const PcBuildProductCard = (product) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleAddProduct = (productData) => {
    dispatch(addToPcBuild(productData));
    router.push("/pcBuilder");
  };

  return (
    <>
      <Row>
        <Col
          flex="50px"
          style={{
            padding: 10,
            marginTop: 10,
            backgroundColor: "#EBECF8",
          }}
        >
          <Image
            src={product.image_url}
            alt={product.name}
            width={250}
            height={250}
          />
        </Col>
        <Col flex="auto" style={{ paddingLeft: 10 }}>
          <h4>{product.name}</h4>
          <p>Category: {product.category}</p>
          <p>Price: {product.price}</p>
          <p>Status: {product.status}</p>
          Rating: <Rate disabled defaultValue={product.rating} />
        </Col>
        <Col
          flex="70px"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Link href={`/buildproducts/${item?.id}`}> */}
          <Button
            type="primary"
            ghost
            onClick={() => handleAddProduct(product)}
          >
            Add
          </Button>
          {/* </Link> */}
        </Col>
      </Row>
      <Divider />
    </>
  );
};

export default PcBuildProductCard;
