import { Button, Modal, Pagination, Space, Table, TableProps } from "antd";
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
  useUpdateProductMutation,
} from "../../redux/features/products/product.api";
import {
  DataType,
  TProductResponse,
  TUpdateProduct,
} from "../../types/product";
import { useState } from "react";

import BSForm from "../../components/form/CSForm";
import BSInput from "../../components/form/CSInput";
import { toast } from "sonner";
import Loading from "../../components/loading/Loading";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { FieldValues } from "react-hook-form";

const AllProducts = () => {
  const [page, setPage] = useState(1);
  const { data: productData, isFetching } = useGetAllProductQuery([
    { name: "page", value: page },
    {
      name: "limit",
      value: 6,
    },
  ]);
  const meta = productData?.data?.meta;

  const allProductsData = (productData as TProductResponse)?.data?.result;

  const tableData = allProductsData?.map(
    ({ _id, name, price, quantity, category }) => ({
      key: _id,
      name,
      price,
      quantity,
      category,
    })
  );

  const columns: TableProps<DataType>["columns"] = [
    {
      title: <span className="text-red-600 font-semibold">Name</span>,
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <a className="hover:text-red-500 font-medium">{text}</a>
      ),
    },
    {
      title: <span className="text-red-600 font-semibold">Price</span>,
      dataIndex: "price",
      key: "price",
    },
    {
      title: <span className="text-red-600 font-semibold">Quantity</span>,
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: <span className="text-red-600 font-semibold">Category</span>,
      dataIndex: "category",
      key: "category",
    },
    {
      title: <span className="text-red-600 font-semibold">Action</span>,
      key: "action",
      render: (item) => (
        <Space>
          <UpdateProductModal product={item} />
          <ConfirmDelete product={item} />
        </Space>
      ),
    },
  ];

  return (
    <div className="px-4 lg:px-16 py-10">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-500 drop-shadow-lg">
          🚗 Product Inventory
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your car listings efficiently
        </p>
      </div>

      {isFetching && <Loading />}

      {!isFetching && (
        <div className="rounded-lg shadow-lg border border-red-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table
              dataSource={tableData}
              loading={isFetching}
              columns={columns}
              pagination={false}
              rowClassName={() => "hover:bg-red-50 transition duration-200"}
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

const UpdateProductModal = ({ product }: TUpdateProduct) => {
  const [productUpdate] = useUpdateProductMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultValues = {
    price: product?.price,
    quantity: product?.quantity,
  };

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating product...");
    try {
      const updatedData = {
        price: Number(data?.price),
        quantity: Number(data?.quantity),
        inStock: Number(data?.quantity) > 0,
      };
      const res = await productUpdate({ id: product.key, data: updatedData });
      if (res?.data) {
        toast.success("Product Updated Successfully!", { id: toastId });
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <>
      <Button
        onClick={showModal}
        className="bg-red-500 hover:bg-red-600 text-white shadow-md"
      >
        Update
      </Button>
      <Modal
        title="Update Product"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="px-2 py-4">
          <BSForm onSubmit={handleSubmit} defaultValues={defaultValues}>
            <BSInput
              name="price"
              label="Price"
              type="number"
              rules={{ required: "Price is required" }}
            />
            <BSInput
              name="quantity"
              label="Quantity"
              type="number"
              rules={{ required: "Quantity is required" }}
            />
            <div className="text-right mt-4">
              <Button
                htmlType="submit"
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Submit
              </Button>
            </div>
          </BSForm>
        </div>
      </Modal>
    </>
  );
};

const ConfirmDelete = ({ product }: TUpdateProduct) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteProduct] = useDeleteProductMutation();

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting...");
    try {
      const res = await deleteProduct(product.key);
      if (res?.data) {
        toast.success(res?.data?.message, { id: toastId });
      } else {
        toast.error("Failed to delete", { id: toastId });
      }
    } catch (err) {
      toast.error("Error deleting product", { id: toastId });
    }
  };

  return (
    <>
      <Button
        onClick={showModal}
        className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
      >
        <DeleteOutlined className="mr-1" /> Delete
      </Button>
      <Modal
        title={
          <span className="text-red-600 flex items-center gap-2">
            <ExclamationCircleOutlined /> Confirm Delete
          </span>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="text-center px-4 py-2">
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete{" "}
            <strong className="text-red-600">{product?.name}</strong>?
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleCancel}
              className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <CloseOutlined /> No
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <CheckOutlined /> Yes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AllProducts;
