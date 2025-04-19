import { useEffect, useState } from "react";
import { useGetAllProductQuery } from "../../redux/features/products/product.api";
import { Input, Pagination, Select } from "antd";
import type { GetProps } from "antd";
import { TQueryParams } from "../../types/global";
import { productItem } from "../../types/product";
import Loading from "../../components/loading/Loading";
import NotFound from "../NotFoundPage/NotFound";
import ProductsCard from "./ProductsCard";

const { Option } = Select;
const { Search } = Input;
type SearchProps = GetProps<typeof Input.Search>;

const AllProducts = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [values, setValues] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState<[number, number] | undefined>(undefined);
  const [priceValue, setPriceValue] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [availability, setAvailability] = useState<boolean | undefined>(
    undefined
  );

  const { data: allProducts, isFetching } = useGetAllProductQuery([
    { name: "sort", value: "price" },
    { name: "sortOrder", value: "asc" },
    { name: "page", value: page },
    { name: "limit", value: 6 },
    ...(category ? [{ name: "category", value: category }] : []),
    ...(availability ? [{ name: "inStock", value: availability }] : []),
    ...(price
      ? [
          { name: "minPrice", value: price[0] },
          { name: "maxPrice", value: price[1] },
        ]
      : []),
    ...params,
  ]);

  const meta = allProducts?.data?.meta;
  const allProductsData = allProducts?.data?.result;

  useEffect(() => {
    if (!isFetching) {
      setLoading(false);
    }
  }, [isFetching, values, page, category, availability, price]);

  const onSearch: SearchProps["onSearch"] = (value) => {
    if (value !== values) {
      setLoading(true);
    }
    setPage(1);
    setValues(value);
    setParams([{ name: "search", value: value }]);
  };

  const onSelectCategory = (value: string) => {
    if (value !== category) {
      setLoading(true);
    }
    setPage(1);
    setCategory(value);
  };

  const onSelectAvailable = (value: boolean) => {
    if (value !== availability) {
      setLoading(true);
    }
    setPage(1);
    setAvailability(value);
  };

  const onSelectPrice = (value: string) => {
    if (value !== priceValue) {
      setLoading(true);
    }
    setPage(1);
    const parseValue = value.split("-").map(Number);
    setPrice(parseValue as [number, number]);
    setPriceValue(value);
  };

  return (
    <div className="pt-[100px] pb-16 bg-gradient-to-b from-white via-rose-50 to-white min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-red-600 to-pink-500 text-transparent bg-clip-text drop-shadow-lg">
          Explore All Products
        </h1>
        <p className="text-gray-500 mt-3 text-md">
          Browse our exclusive collection
        </p>
      </div>

      <div className="max-w-5xl mx-auto p-6 rounded-2xl bg-white/60 backdrop-blur border border-red-100 shadow-lg mb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          <Search
            placeholder="Search products..."
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            className="col-span-full md:col-span-2 lg:col-span-1 "
          />

          <Select
            placeholder="Availability"
            value={availability}
            onChange={onSelectAvailable}
            className="w-full"
            size="large"
            allowClear
          >
            <Option value="true">In Stock</Option>
            <Option value="false">Out of Stock</Option>
          </Select>

          <Select
            placeholder="Select Category"
            value={category}
            onChange={onSelectCategory}
            className="w-full"
            size="large"
            allowClear
          >
            <Option value="Sedan">Sedan</Option>
            <Option value="SUV">SUV</Option>
            <Option value="Truck">Truck</Option>
            <Option value="Hatchback">Hatchback</Option>
            <Option value="Sports">Sports</Option>
            <Option value="Electric">Electric</Option>
            <Option value="Luxury">Luxury</Option>
          </Select>

          <Select
            placeholder="Price Range"
            value={priceValue}
            className="w-full"
            size="large"
            onChange={onSelectPrice}
            allowClear
          >
            <Option value="0-50000">Less than $50,000</Option>
            <Option value="50000-100000">$50,000 - $100,000</Option>
            <Option value="100000-1000000">Above $100,000</Option>
          </Select>
        </div>
      </div>

      {(loading || isFetching) && <Loading />}

      {!loading && (
        <div className="flex justify-center">
          {allProductsData && allProductsData.length > 0 ? (
            <div className="w-full max-w-7xl px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {allProductsData?.map((item: productItem, index: number) => (
                  <ProductsCard product={item} key={index} />
                ))}
              </div>
              <div className="mt-12 flex justify-center">
                <Pagination
                  current={page}
                  onChange={(value) => setPage(value)}
                  pageSize={meta?.limit}
                  total={meta?.total}
                  className="custom-pagination"
                />
              </div>
            </div>
          ) : (
            !isFetching && (
              <div className="flex justify-center mt-16">
                <NotFound />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
