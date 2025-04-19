import { Card, Col, Row, Statistic } from "antd";
import {
  DollarOutlined,
  ShoppingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const OverViewCards = () => {
  return (
    <div className="mt-4 px-2">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card
            bordered={false}
            className="shadow-md hover:shadow-xl transition duration-300 rounded-xl"
          >
            <Statistic
              title={<span className="text-lg font-semibold text-gray-600">Total Revenue</span>}
              value={12345}
              prefix={<DollarOutlined style={{ color: "#f5222d" }} />}
              valueStyle={{ color: "#f5222d", fontWeight: "bold" }}
              suffix="USD"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            bordered={false}
            className="shadow-md hover:shadow-xl transition duration-300 rounded-xl"
          >
            <Statistic
              title={<span className="text-lg font-semibold text-gray-600">Products Sold</span>}
              value={125}
              prefix={<ShoppingOutlined style={{ color: "#f5222d" }} />}
              valueStyle={{ color: "#f5222d", fontWeight: "bold" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            bordered={false}
            className="shadow-md hover:shadow-xl transition duration-300 rounded-xl"
          >
            <Statistic
              title={<span className="text-lg font-semibold text-gray-600">New Users</span>}
              value={45}
              prefix={<UserAddOutlined style={{ color: "#f5222d" }} />}
              valueStyle={{ color: "#f5222d", fontWeight: "bold" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OverViewCards;
