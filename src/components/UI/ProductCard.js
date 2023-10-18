// import Image from "next/image";
import { Card, Rate, Image } from "antd";
import Link from "next/link";
const { Meta } = Card;

const ProductCard = ({
  id,
  title,
  price,
  category,
  location,
  serviceImage,
}) => {
  const imageStyle = {
    height: "200px", // Set your desired fixed height here
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };

  return (
    <Link href={`/products/${id}`}>
      <Card
        hoverable
        style={{
          padding: 10,
          height: 400,
        }}
        // cover={<Image src={serviceImage} alt={title} height={300} />}
      >
        <div style={imageStyle}>
          <Image
            alt={title}
            src={serviceImage}
            preview={false}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>
        <Meta title={title} description="" />
        <p>Category: {category}</p>
        <p>Price: {price}</p>
        {/* Rating: <Rate disabled defaultValue={rating} /> */}
      </Card>
    </Link>
  );
};

export default ProductCard;
