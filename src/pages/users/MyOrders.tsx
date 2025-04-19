import { JwtPayload } from "jwt-decode";

import { selectCurrenttoken } from "../../redux/features/auth/AuthSlice";
import { useAppSelector } from "../../redux/features/hook";
import { useGetAllOrdersByEmailQuery } from "../../redux/features/orders/order.api";
import { VerifyToken } from "../../utils/verifyToken";
import { useState } from "react";
import { Pagination, Table, TableProps, Tag, Card } from "antd";
import { TOrderResponse, TOrdersProType } from "../../types/user";

interface CustomJwtPayload extends JwtPayload {
  email?: string;
}

const MyOrders = () => {
  const [page, setPage] = useState(1);
  const token = useAppSelector(selectCurrenttoken);
  const user = token ? (VerifyToken(token) as CustomJwtPayload) : null;

  const { data: myOrders, isFetching } = useGetAllOrdersByEmailQuery([
    { name: "email", value: user?.email },
    { name: "page", value: page },
    { name: "limit", value: 5 },
  ]);

  const orderData = (myOrders as TOrderResponse)?.data?.result;
  const meta = myOrders?.data?.meta;

  const tableData = orderData?.map(
    ({ _id, name, email, product, amount, delivered }) => ({
      key: _id,
      name,
      email,
      productName: product?.name,
      productImage: product?.image,
      amount,
      delivered,
    })
  );

  const columns: TableProps<TOrdersProType>["columns"] = [
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
      render: (text) => (
        <span className="text-red-600 font-semibold">{text}</span>
      ),
    },
    {
      title: "Image",
      dataIndex: "productImage",
      key: "productImage",
      render: (url) => (
        <div className="w-14 h-14 rounded-md overflow-hidden border border-red-100 shadow">
          <img src={url} alt="product" className="w-full h-full object-cover" />
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <span className="text-lg font-bold text-red-500">${amount}</span>
      ),
    },
    {
      title: "Status",
      key: "delivered",
      render: (_, item) => {
        const status = item.delivered === "Delivered" ? "Delivered" : "Pending";
        const color = status === "Delivered" ? "volcano" : "gold";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-500 drop-shadow">
          Your Order Summary
        </h1>
        <p className="text-gray-500 mt-2">
          Here's a list of your recent purchases and their statuses.
        </p>
      </div>

      <Card
        className="rounded-xl border-red-100 shadow-xl bg-white/70 backdrop-blur-lg"
        bodyStyle={{ padding: "1.5rem" }}
      >
        <Table
          dataSource={tableData}
          columns={columns}
          loading={isFetching}
          pagination={false}
          bordered
          rowClassName="hover:bg-red-50 transition duration-300"
        />
      </Card>

      <div className="mt-8 flex justify-end">
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          total={meta?.total}
          pageSize={meta?.limit}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default MyOrders;
