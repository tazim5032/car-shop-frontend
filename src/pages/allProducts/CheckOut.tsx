import { useLocation } from "react-router-dom";
import { Form, Input, Button, Card, Select } from "antd";
import { useCreatePaymentMutation } from "../../redux/features/products/product.api";
import { toast } from "sonner";
import { useState } from "react";
import { useAppSelector } from "../../redux/features/hook";
import { selectCurrenttoken } from "../../redux/features/auth/AuthSlice";
import { VerifyToken } from "../../utils/verifyToken";
import { JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  email: string;
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

const CheckOut: React.FC = () => {
  const location = useLocation();
  const product: Product | undefined = location.state?.product;
  const [totalPrice, setTotalPrice] = useState(product?.price);
  const [createPayment] = useCreatePaymentMutation();
  const [form] = Form.useForm();

  let user: CustomJwtPayload | null = null;
  const token = useAppSelector(selectCurrenttoken);
  if (token) {
    user = VerifyToken(token) as CustomJwtPayload;
  }
  const defaultValues = {
    name: "",
    email: user?.email,
    address: "",
    paymentMethod: "USD",
    totalPrice: totalPrice,
  };

  if (!product) {
    return (
      <p className="text-center text-red-500 text-lg mt-10">
        No product selected for checkout.
      </p>
    );
  }

  const { id, name, image, price } = product;

  const onFinish = async (values: any) => {
    const toastId = toast.loading("🛒 Finalizing your order...");
    try {
      const orderInfo = {
        ...values,
        totalPrice: Number(values.totalPrice),
        productId: id,
      };
      const res = await createPayment(orderInfo);
      const paymentUrl = res?.data?.data?.paymentUrl;

      if (paymentUrl) {
        toast.success(
          "✅ Order confirmed! Redirecting you to payment page...",
          {
            id: toastId,
            duration: 3000,
          }
        );
        setTimeout(() => {
          window.location.replace(paymentUrl);
        }, 1500);
      } else {
        throw new Error("No payment URL returned");
      }
    } catch (err) {
      console.error(err);
      toast.error("🚫 Failed to process your order. Try again later.", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  const handleSelect = (value: string) => {
    if (value === "BDT") {
      const priceInBDT: number = parseInt((product?.price * 82).toString());
      setTotalPrice(priceInBDT);
      form.setFieldsValue({ totalPrice: priceInBDT });
    } else {
      setTotalPrice(product?.price);
      form.setFieldsValue({ totalPrice: product?.price });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Card className="bg-white/70 backdrop-blur-lg border border-red-100 shadow-2xl rounded-3xl p-8 space-y-8">
       
        <div className="flex flex-col items-center text-center space-y-4">
          <img
            src={image}
            alt={name}
            className="w-48 h-48 object-cover rounded-2xl border-4 border-rose-200 shadow-md"
          />
          <h2 className="text-3xl font-extrabold text-red-600">{name}</h2>
          <p className="text-gray-600 text-sm">
            <span className="font-medium">Category:</span> Premium Collection
          </p>
          <p className="text-gray-600 text-sm">
            <span className="font-medium">Product ID:</span> #{id?.slice(-6)}
          </p>
          <p className="text-lg font-bold text-red-500">${price}</p>
          <p className="text-gray-500 text-center max-w-md">
            Experience the luxury of our exclusive collection crafted with
            premium materials, designed for both comfort and durability. Stocks
            are limited – get yours now!
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-red-600 text-center mb-6">
            Shipping & Payment
          </h2>
          <Form
            layout="vertical"
            onFinish={onFinish}
            className="space-y-5"
            initialValues={defaultValues}
            form={form}
          >
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input size="large" placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input size="large" disabled />
            </Form.Item>

            <Form.Item label="Total Price" name="totalPrice">
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Shipping Address"
              name="address"
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <Input.TextArea rows={3} placeholder="123 Main Street..." />
            </Form.Item>

            <Form.Item
              label="Payment Method"
              name="paymentMethod"
              rules={[
                { required: true, message: "Please select payment method" },
              ]}
            >
              <Select size="large" onChange={handleSelect}>
                <Select.Option value="BDT">BDT (৳)</Select.Option>
                <Select.Option value="USD">USD ($)</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                size="large"
                className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold py-2 rounded-xl shadow-md"
              >
                Confirm & Pay
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default CheckOut;
