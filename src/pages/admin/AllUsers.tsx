import { Button, Modal, Pagination, Space, Table, TableProps, Tag } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import Loading from "../../components/loading/Loading";
import {
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { TUserResponse, TUserDataType } from "../../types/user";
import {
  useBlockUnblockUserMutation,
  useGetAllUsersQuery,
} from "../../redux/features/users/users.api";
import { TuserModal } from "../../types/product";

const AllUsers = () => {
  const [page, setPage] = useState(1);
  const { data: userData, isFetching } = useGetAllUsersQuery([
    { name: "page", value: page },
    { name: "limit", value: 5 },
    { name: "role", value: "user" },
  ]);

  const meta = userData?.data?.meta;
  const alluserData = (userData as TUserResponse)?.data?.result;

  const tableData = alluserData?.map(
    ({ _id, name, email, isBlocked }) => ({
      key: _id,
      name,
      email,
      isBlocked,
    })
  );

  const columns: TableProps<TUserDataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a className="hover:text-red-600">{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      key: "isBlocked",
      render: (item) => {
        let tagColor = item.isBlocked ? "red" : "green";
        return (
          <Space>
            {item.isBlocked ? (
              <Tag color={tagColor}>Blocked</Tag>
            ) : (
              <Tag color={tagColor}>Active</Tag>
            )}
          </Space>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <Space>
          <ConfirmDelete product={item} />
        </Space>
      ),
    },
  ];

  return (
    <div className="px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-500 drop-shadow-lg">
          🚨 User Management
        </h1>
      </div>

      {isFetching && <Loading />}

      {!isFetching && (
        <div className="mt-8 rounded-lg shadow-lg border border-red-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table
              dataSource={tableData}
              loading={isFetching}
              columns={columns}
              pagination={false}
              scroll={{ x: true }}
            />
          </div>
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

const ConfirmDelete = ({ product }: TuserModal) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blockUnblockUser] = useBlockUnblockUserMutation();

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleDelete = async () => {
    const toastId = toast.loading("Processing...");
    try {
      const statusValue = !product?.isBlocked;
      const res = await blockUnblockUser({
        id: product?.key,
        queryParams: [{ name: "isBlock", value: statusValue }],
      });

      if (res?.data) {
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 2000 });
      }
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
      toast.error("Error processing request", { id: toastId, duration: 2000 });
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      {product?.isBlocked ? (
        <Button
          onClick={showModal}
          className="flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-medium shadow-md"
        >
          <UnlockOutlined />
          Unblock
        </Button>
      ) : (
        <Button
          onClick={showModal}
          className="flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-medium shadow-md"
        >
          <LockOutlined />
          Block
        </Button>
      )}

      <Modal
        title={
          <div className="flex items-center gap-2 text-red-600">
            <ExclamationCircleOutlined />
            Confirm Action
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex flex-col items-center text-center p-4">
          <p className="text-gray-600 mb-4">
            Are you sure you want to {!product.isBlocked ? "Block" : "Unblock"}{" "}
            <strong className="text-red-600">{product?.name}</strong>? This
            action cannot be undone.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={handleCancel}
              className="flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-medium shadow-md"
            >
              <CloseOutlined />
              No
            </Button>
            <Button
              onClick={handleDelete}
              className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-medium shadow-md"
            >
              <CheckOutlined />
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AllUsers;
