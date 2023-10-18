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
  return (
    <Link href={`/products/${id}`}>
      <Card
        hoverable
        style={{
          padding: 10,
          height: 500,
        }}
        cover={<Image src={serviceImage} alt={title} height={300} />}
        //
      >
        <Meta title={title} description="" />
        <p>Category: {category}</p>
        <p>Price: {price}</p>
        {/* Rating: <Rate disabled defaultValue={rating} /> */}
      </Card>
    </Link>
  );
};

export default ProductCard;
