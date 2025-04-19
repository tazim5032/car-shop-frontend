import { useState } from "react";
import { useGetAllSuccessfullOrdersQuery } from "../../redux/features/orders/order.api";
import { TOrderResponse, TOrdersProType } from "../../types/user";
import Loading from "../../components/loading/Loading";
import { Pagination, Table, TableProps, Tag } from "antd";

const MangerOrders = () => {
  const [page, setPage] = useState(1);
  const { data: allOrders, isFetching } = useGetAllSuccessfullOrdersQuery([
    { name: "page", value: page },
    { name: "limit", value: 5 },
  ]);

  const orderData = (allOrders as TOrderResponse)?.data?.result;
  const meta = allOrders?.data?.meta;

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
      title: <span className="text-red-600 font-semibold">Product</span>,
      dataIndex: "productName",
      key: "productName",
      render: (text) => <span className="font-medium text-gray-800">{text}</span>,
    },
    {
      title: <span className="text-red-600 font-semibold">Image</span>,
      dataIndex: "productImage",
      key: "productImage",
      render: (item) => (
        <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
          <img src={item} alt="product" className="w-full h-full object-cover" />
        </div>
      ),
    },
    {
      title: <span className="text-red-600 font-semibold">Amount</span>,
      dataIndex: "amount",
      key: "amount",
      render: (text) => <span className="text-gray-800 font-medium">${text}</span>,
    },
    {
      title: <span className="text-red-600 font-semibold">Status</span>,
      key: "delivered",
      render: (item) => {
        const tagColor = item.delivered === "Pending" ? "red" : "green";
        return (
          <Tag color={tagColor} className="font-semibold">
            {item.delivered}
          </Tag>
        );
      },
    },
  ];

  return (
    <div className="px-4 lg:px-16 py-10">
      <div className="text-center mb-12 mt-20">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-500 drop-shadow-lg">
          Manage Orders
        </h1>
      </div>

      {isFetching && <Loading />}

      {!isFetching && (
        <div className="rounded-lg shadow-lg border border-red-200 overflow-hidden mt-8">
          <Table
            dataSource={tableData}
            columns={columns}
            pagination={false}
            loading={isFetching}
            rowClassName={() =>
              "hover:bg-red-50 transition duration-200"
            }
          />
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          total={meta?.total}
          pageSize={meta?.limit}
        />
      </div>
    </div>
  );
};

export default MangerOrders;
