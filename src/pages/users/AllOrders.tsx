import { Card, Table } from "antd";
import OverViewCards from "../admin/Dashboard/OverViewCards";
import OverviewCahrts from "../admin/Dashboard/OverviewCahrts";
import { ColumnType } from "antd/es/table";

const AllOrders = () => {
  const tableData = [
    { key: 1, product: "Tesla Model 3", price: 35000, quantity: 5 },
    { key: 2, product: "Ford Mustang", price: 28000, quantity: 3 },
    { key: 3, product: "Toyota Supra", price: 42000, quantity: 2 },
  ];

  const columns: ColumnType<{
    key: number;
    product: string;
    price: number;
    quantity: number;
  }>[] = [
    {
      title: <span className="text-red-500 font-semibold">Car Model</span>,
      dataIndex: "product",
      key: "product",
    },
    {
      title: <span className="text-red-500 font-semibold">Price (USD)</span>,
      dataIndex: "price",
      key: "price",
      responsive: ["sm", "md", "lg"],
      render: (price: number) => (
        <span className="text-gray-700 font-medium">${price}</span>
      ),
    },
    {
      title: <span className="text-red-500 font-semibold">Quantity</span>,
      dataIndex: "quantity",
      key: "quantity",
      render: (qty: number) => (
        <span className="text-gray-700 font-medium">{qty}</span>
      ),
    },
  ];

  return (
    <div className="max-w-full px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">📊 Dashboard Overview</h2>

      <OverViewCards />

      <OverviewCahrts />

      <Card
        title={
          <h3 className="text-lg font-semibold text-red-600">
            🚗 Car Inventory Overview
          </h3>
        }
        bordered={false}
        className="shadow-md rounded-xl"
      >
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          rowClassName={() =>
            "hover:bg-red-50 transition duration-200 cursor-pointer"
          }
        />
      </Card>
    </div>
  );
};

export default AllOrders;
