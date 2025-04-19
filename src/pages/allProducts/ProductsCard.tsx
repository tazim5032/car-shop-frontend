import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { productItem } from "../../types/product";
import { Link } from "react-router-dom";

interface TproductItemProps {
  product: productItem;
}

const ProductsCard = ({ product }: TproductItemProps) => {
  const { name, price, inStock, image, category, _id } = product;
  const filteredField = {
    id: _id,
    name,
    image,
    price,
  };

  return (
    <div className="relative group rounded-3xl overflow-hidden w-full max-w-xs mx-auto transition-all duration-300">
      <div className="relative z-10 -mb-12 transform group-hover:-translate-y-4 transition-transform duration-300">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-2xl shadow-lg"
        />
      </div>

      <div className="backdrop-blur-md bg-white/70 border border-red-100 shadow-xl rounded-3xl pt-16 pb-6 px-4 flex flex-col justify-between">
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-500">{category}</p>

          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-lg font-semibold text-red-500">${price}</span>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                inStock
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Tooltip title="Buy Now" color="red">
            <Link
              to={"/user/checkout"}
              state={{ product: filteredField }}
              className="w-1/2"
            >
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold rounded-xl shadow-md"
                disabled={product?.quantity <= 0}
              />
            </Link>
          </Tooltip>

          <Tooltip title="View Details" color="red">
            <Link to={`/product/${_id}`} className="w-1/2">
              <Button
                type="default"
                icon={<EyeOutlined />}
                className="w-full border border-red-400 text-red-500 hover:bg-red-500 hover:text-white font-semibold rounded-xl shadow-md"
              />
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
