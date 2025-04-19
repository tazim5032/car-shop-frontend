import { useGetAllProductQuery } from "../../../redux/features/products/product.api";
import { productItem } from "../../../types/product";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const { data: allProducts, isFetching } = useGetAllProductQuery([
    { name: "page", value: 1 },
    { name: "limit", value: 6 },
  ]);

  const allProductsData = allProducts?.data?.result;

  return (
    <section className="py-20 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold text-red-700">Featured Cars</h2>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          Discover our handpicked collection of premium cars, combining top-tier
          performance, modern design, and unmatched reliability. Perfect for
          every road and every lifestyle.
        </p>
      </div>

      {!isFetching && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-12">
          {allProductsData?.map((product: productItem) => (
            <div
              key={product._id}
              className="bg-white border border-red-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 group"
            >
              <div className="overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transform transition duration-300 "
                />
                <span className="absolute top-4 left-4 bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-semibold shadow">
                  {product.brand}
                </span>
                <span
                  className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-semibold shadow text-white ${
                    product.inStock ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {product.inStock ? "Available" : "Sold Out"}
                </span>
              </div>

              <div className="p-5 flex flex-col gap-3">
                <h3 className="text-xl font-bold text-gray-800 truncate">
                  {product.name}
                </h3>
                <p className="text-red-600 text-lg font-semibold">
                  ${product.price}
                </p>

                <Link
                  to={`/product/${product._id}`}
                  className="mt-2 inline-block text-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full font-semibold transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-16 flex justify-center">
        <a
          href="/all-products"
          className="inline-block bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-transform hover:scale-105"
        >
          Explore All Cars
        </a>
      </div>
    </section>
  );
};

export default FeaturedProducts;
