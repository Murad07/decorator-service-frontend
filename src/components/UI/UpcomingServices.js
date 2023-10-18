// import ProductCard from "./ProductCard";
// import { Col, Row } from "antd";

// const AvailableServices = ({ allProducts }) => {
//   return (
//     <div>
//       <h1>Available Services</h1>
//       <div className="blog-card-container">
//         <Row gutter={[15, 15]}>
//           {allProducts?.map((blog, index) => (
//             <Col xs={24} sm={6} key={index} span={6}>
//               <ProductCard key={index} {...blog} />
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default AvailableServices;

import { useGetUpcomingServicesQuery } from "@/redux/api/api";
import React from "react";
import ProductCard from "./ProductCard";
import { Col, Row, Spin } from "antd";

const UpcomingService = () => {
  const { data, error, isLoading } = useGetUpcomingServicesQuery();

  if (isLoading) {
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

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // console.log(data.data);

  return (
    <div>
      <h2>Upcoming Services</h2>
      {/* <ul>
        {data.data?.map((service) => (
          <li key={service.id}>{service.title}</li>
        ))}
      </ul> */}
      <div className="blog-card-container">
        <Row gutter={[15, 15]}>
          {data.data?.map((blog, index) => (
            <Col xs={24} sm={6} key={index} span={6}>
              <ProductCard key={index} {...blog} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default UpcomingService;
