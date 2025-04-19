import { Button, Card, Typography, Space } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Success = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50 px-4 py-8">
      <Card
        bordered={false}
        className="w-full max-w-2xl bg-white/90 backdrop-blur-md shadow-xl rounded-3xl text-center p-10 space-y-6 border border-orange-100"
      >
        <CheckCircleOutlined
          className="text-7xl text-orange-500 animate-pulse"
        />
        
        <Title level={2} className="!text-orange-600 !mt-2">
          Payment Successful!
        </Title>

        <Text className="text-gray-600 text-base">
          🎉 Congratulations! Your payment was successfully processed. We're
          excited to have you as a valued customer.
        </Text>

        <Space direction="vertical" size={12} className="text-left w-full mt-5">
          <Text className="font-semibold text-gray-700">
            Order ID: <span className="text-orange-600 ">#12345ABC</span>
          </Text>


          <Text className="text-gray-600 text-sm">
            Your order is now being processed and will be shipped within the next
            2 business days. You will receive an email confirmation shortly.
          </Text>
        </Space>

        <div className="mt-8 space-x-4">
          <Button
            type="primary"
            size="large"
            href="/"
            className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white font-semibold px-6 py-3 rounded-xl shadow-md"
          >
            Back to Homepage
          </Button>

          <Button
            size="large"
            
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md"
          >
            View Order Details
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Success;
