import { Card } from "antd";
import Link from "next/link";

const CategoriesCard = ({ cat }) => {
  return (
    <Link href={`/categories/${cat?.id}`}>
      <Card
        hoverable
        style={
          {
            // padding: auto,
          }
        }
      >
        <h1>{cat?.name}</h1>
      </Card>
    </Link>
  );
};

export default CategoriesCard;
