  import { FieldValues, SubmitHandler } from "react-hook-form";
  import CSForm from "../../components/form/CSForm";
  import CSInput from "../../components/form/CSInput";
  import { Button } from "antd";
  import CSSelect from "../../components/form/CSSelect";
  import CSTextArea from "../../components/form/CSTestArea";
  import axios from "axios";
  import { toast } from "sonner";
  import { useAddProductMutation } from "../../redux/features/products/product.api";
  import { CarOutlined, PlusOutlined } from "@ant-design/icons";

  const category = ['Sedan',  'SUV',  'Truck' , 'Hatchback' , 'Sports',  'Electric' , 'Luxury'];

  const CreateNewProduct = () => {
    const [addNewProduct] = useAddProductMutation();

    // console.log("pros = ", import.meta.env.VITE_CLOUD_NAME ?? "")

    const categoryOptions = category.map((item) => ({
      value: item,
      label: item,
    }));

    const onsubmit: SubmitHandler<FieldValues> = async (data) => {
      const toastId = toast.loading("Adding new car...");
      try {
        const formData = new FormData();
        formData.append("file", data.image[0]);
        formData.append("upload_preset", import.meta.env.VITE_CLOUD_PRESET ?? "");
        formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME ?? "");
        console.log(formData)

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
          formData
        );
        const imageUrl = response.data.secure_url;

        const productData = {
          name: data.name,
          brand: data.brand,
          image: imageUrl,
          price: Number(data.price),
          category: data.category,
          description: data.description,
          quantity: Number(data.quantity),
          inStock: true,
        };

        const res = await addNewProduct(productData);
        if (res.data) {
          toast.success("🚗 Car added successfully!", { id: toastId });
        } else {
          toast.error("❌ Failed to add car. Try again.", { id: toastId });
        }
      } catch (err) {
        console.error(err);
        toast.error("❌ Something went wrong. Please try again.", {
          id: toastId,
        });
      }
    };

    return (
      <div className="max-w-3xl w-full mx-auto flex flex-col justify-center min-h-screen px-4 py-8">
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border">
          <div className="flex items-center justify-center gap-3 mb-8">
            <CarOutlined className="text-3xl text-red-500" />
            <h1 className="text-3xl font-semibold text-gray-800">
              Add a New Car to Inventory
            </h1>
          </div>

          <CSForm onSubmit={onsubmit}>
            <div className="grid grid-cols-1  gap-6">
              <CSInput
                name="name"
                label="Car Model"
                type="text"
                rules={{ required: "Car model is required" }}
              />
              <CSInput
                name="brand"
                label="Brand"
                type="text"
                rules={{ required: "Car brand is required" }}
              />
              <CSInput
                name="image"
                label="Upload image"
                type="file"
                accept="image/*"
                rules={{ required: "Car image is required" }}
              />
              <CSInput
                name="price"
                label="Price (USD)"
                type="number"
                rules={{ required: "Price is required" }}
              />
              <CSSelect
                label="Car Type"
                name="category"
                options={categoryOptions}
                rules={{ required: "Car type is required" }}
              />
              <CSInput
                name="quantity"
                label="Stock Quantity"
                type="number"
                rules={{ required: "Quantity is required" }}
              />
            </div>

            <div className="mt-6">
              <CSTextArea
                name="description"
                label="Car Description"
                rules={{ required: "Description is required" }}
              />
            </div>

            <div className="flex justify-end mt-8">
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                className="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white font-semibold shadow-lg px-6 py-2 rounded-lg"
                icon={<PlusOutlined />}
              >
                Add Car
              </Button>
            </div>
          </CSForm>
        </div>
      </div>
    );
  };

  export default CreateNewProduct;
