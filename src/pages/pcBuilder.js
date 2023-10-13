import RootLayout from "@/components/Layouts/RootLayout";
import { Button, Col, Divider, Row } from "antd";
import cpu from "../../public/images/cpu.png";
import monitor from "../../public/images/monitor.png";
import motherboard from "../../public/images/motherboard.jpeg";
import power from "../../public/images/power.png";
import ram from "../../public/images/ram.png";
import storage from "../../public/images/storage.png";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PcBuilder = () => {
  const buildProducts = useSelector((state) => state.pcbuild);

  // Count the non-empty items
  const nonEmptyItemsCount = buildProducts.products.filter(
    (item) => Object.keys(item).length > 0
  ).length;

  // Calculate the total price
  const totalPrice = buildProducts.products.reduce((acc, item) => {
    const price = parseInt(item.price, 10);
    return acc + (Number.isNaN(price) ? 0 : price);
  }, 0);

  // console.log("Test: ", buildProducts.products[1]);

  const handleBuildComplete = () => {
    toast("PC Build Successfully!");
  };

  const items = [
    { id: "1", name: "CPU", iconUrl: cpu },
    { id: "2", name: "Motherboard", iconUrl: motherboard },
    { id: "3", name: "RAM", iconUrl: ram },
    { id: "4", name: "Monitor", iconUrl: monitor },
    { id: "5", name: "Power Supply", iconUrl: power },
    { id: "6", name: "Storage Device", iconUrl: storage },
  ];
  return (
    <RootLayout>
      <div>
        <Row>
          <Col xs={24} sm={20} span={14}>
            <h1>Decorator Service - Build Your Own Computer</h1>
          </Col>
          <Col xs={24} sm={4} span={10}>
            <div
              style={{
                borderRadius: 7,
                width: 200,
                height: 100,
                backgroundColor: "#3749BB",
                display: "flex",
                justifyItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  color: "white",
                }}
              >
                <h4>{totalPrice} TK</h4>
                <h4>{nonEmptyItemsCount} Items</h4>
              </div>
            </div>
          </Col>
        </Row>

        <div
          style={{
            width: "100%",
            height: 30,
            backgroundColor: "gray",
            color: "white",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Core Components
        </div>

        <div>
          {items?.map((item, index) => (
            <Row key={item.id}>
              <Col
                flex="50px"
                style={{
                  padding: 10,
                  marginTop: 10,
                  backgroundColor: "#EBECF8",
                }}
              >
                <Image
                  src={item.iconUrl}
                  alt={item.name}
                  width={50}
                  height={50}
                />
              </Col>

              <Col flex="auto" style={{ paddingLeft: 10 }}>
                {buildProducts.products[index] ? (
                  <Row>
                    <Col>
                      <h3>{buildProducts.products[index].name}</h3>
                      <p>Price: {buildProducts.products[index].price}</p>
                    </Col>
                    <Col>
                      <Image
                        src={buildProducts.products[index].image_url}
                        alt={buildProducts.products[index].name}
                        width={150}
                        height={150}
                      />
                    </Col>
                  </Row>
                ) : (
                  <h4>{item.name}</h4>
                )}
              </Col>

              <Col
                flex="70px"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link href={`/buildproducts/${item?.id}`}>
                  <Button type="primary" ghost>
                    Choose
                  </Button>
                </Link>
              </Col>
              <Divider />
            </Row>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="primary"
            size="large"
            disabled={nonEmptyItemsCount < 6}
            onClick={() => handleBuildComplete()}
          >
            Comple Build
          </Button>
        </div>

        <ToastContainer />
      </div>
    </RootLayout>
  );
};

export default PcBuilder;
