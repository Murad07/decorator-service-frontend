import React from "react";
import { Carousel, Col, Row } from "antd";
import Image from "next/image";
import Banner1 from "../../../public/images/banner1.jpg";
import Banner2 from "../../../public/images/banner2.jpg";
import Banner3 from "../../../public/images/banner3.jpg";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Banner = () => {
  const items = [
    {
      id: "1",
      imgUrl: Banner1,
      title: "title1",
      description: "A",
    },
    {
      id: "2",
      imgUrl: Banner2,
      title: "title2",
      description: "B",
    },
    {
      id: "3",
      imgUrl: Banner3,
      title: "title3",
      description: "V",
    },
  ];

  return (
    <Carousel autoplay>
      {items?.map((item, index) => (
        <div key={index}>
          <Image
            src={item.imgUrl}
            alt={item.id}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      ))}
    </Carousel>
  );
};
export default Banner;
