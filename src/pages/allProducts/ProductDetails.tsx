import { Link, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/features/products/product.api";
import Loading from "../../components/loading/Loading";
import { Button, Card, Tag, Rate } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ShoppingCartOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: productData, isFetching } = useGetSingleProductQuery(id);
  const product = productData?.data;

  const filteredField = {
    id: product?._id,
    name: product?.name,
    image: product?.image,
    price: product?.price,
  };

  if (isFetching) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 bg-gradient-to-br from-white to-rose-50">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="flex flex-col items-center">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full max-w-md rounded-3xl shadow-2xl border border-rose-200 hover:scale-105 transition duration-300"
          />
          <div className="mt-4">
            <Rate disabled defaultValue={4} className="text-rose-500" />
            <p className="text-sm text-gray-500 mt-1">128 reviews</p>
          </div>
        </div>

        <Card className="bg-white/90 rounded-3xl shadow-lg border border-rose-100 backdrop-blur p-6">
          <h1 className="text-4xl font-extrabold text-gray-800">
            {product?.name}
          </h1>

          <div className="mt-2 text-gray-600 space-y-1">
            <p className="text-base">
              Brand: <span className="font-medium">{product?.brand}</span>
            </p>
            <p className="text-base">
              Category: <span className="font-medium">{product?.category}</span>
            </p>
            <p className="text-lg text-red-500 font-bold mt-3">
              ${product?.price}
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-gray-700 leading-relaxed">
              {product?.description}
            </p>

            <div className="mt-5">
              <h3 className="text-lg font-semibold text-gray-800">
                Highlights
              </h3>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Premium quality materials</li>
                <li>100% original and verified</li>
                <li>Eco-friendly packaging</li>
                <li>Available for fast delivery</li>
              </ul>
            </div>

            <div className="mt-5">
              <h3 className="text-lg font-semibold text-gray-800">Shipping</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <InfoCircleOutlined /> Ships within 24 hours. Free delivery over
                $50.
              </p>
            </div>

            <div className="mt-4 space-y-1 text-sm text-gray-600">
              <p>
                Quantity:{" "}
                <span className="font-medium">{product?.quantity}</span>
              </p>
              <p>
                Status:{" "}
                {product?.inStock ? (
                  <Tag icon={<CheckCircleOutlined />} color="success">
                    In Stock
                  </Tag>
                ) : (
                  <Tag icon={<CloseCircleOutlined />} color="error">
                    Out of Stock
                  </Tag>
                )}
              </p>
              <p>
                Created: {new Date(product?.createdAt).toLocaleDateString()}
              </p>
              <p>
                Updated: {new Date(product?.updatedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="mt-6">
              <Button
                icon={<ShoppingCartOutlined />}
                size="large"
                disabled={product?.quantity <= 0}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold px-8 py-2 rounded-xl shadow-md transition-all duration-200"
              >
                <Link
                  to={"/user/checkout"}
                  state={{ product: filteredField }}
                >
                  Buy Now
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetails;
