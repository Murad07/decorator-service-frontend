// import Image from "next/image";
import {
  addToCart,
  removeFromCart,
  selectCartItems,
} from "@/redux/features/cartSlice";
import { Card, Rate, Image, Button } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
const { Meta } = Card;

const ProductCard = ({
  id,
  title,
  price,
  category,
  location,
  serviceImage,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const imageStyle = {
    height: "200px", // Set your desired fixed height here
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };

  const serviceToAdd = { id: id, title: title, price: price, serviceImage };

  const addServiceToCart = () => {
    dispatch(addToCart(serviceToAdd));
  };

  const serviceToRemove = { id: id };

  const removeServiceFromCart = () => {
    dispatch(removeFromCart(serviceToRemove));
  };

  return (
    <>
      <Card
        hoverable
        style={{
          padding: 10,
          height: 400,
        }}
      >
        <Link href={`/products/${id}`}>
          <div style={imageStyle}>
            <Image
              alt={title}
              src={serviceImage}
              preview={false}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>

          <Meta title={title} description="" />
        </Link>
        <p>Category: {category}</p>
        <p>Price: {price}</p>
        <Button onClick={addServiceToCart}>Add to Cart</Button>
      </Card>
    </>
  );
};

export default ProductCard;
