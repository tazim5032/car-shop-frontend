import { Button, Card, Typography, Space } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Cancel = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 px-4 py-8">
      <Card
        bordered={false}
        className="w-full max-w-2xl bg-white/90 backdrop-blur-md shadow-xl rounded-3xl text-center p-10 space-y-6 border border-red-100"
      >
        <CloseCircleOutlined className="text-7xl text-red-500 " />

        <Title level={2} className="!text-red-600 !mt-2">
          Payment Failed!
        </Title>

        <Text className="text-gray-600 text-base">
          😔 We're sorry, but your payment attempt was unsuccessful. Please try
          again or reach out to support for assistance.
        </Text>

        <Space direction="vertical" size={12} className="text-left w-full mt-5">
          <Text className="font-semibold text-gray-700">
            Order ID: <span className="text-red-600">#12345ABC</span>
          </Text>

          <Text className="text-gray-600 text-sm">
            If the payment issue persists, feel free to contact our support
            team. We're here to help.
          </Text>
        </Space>

        <div className="mt-8 space-x-4">
          <Button
            type="primary"
            size="large"
            href="/"
            className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md"
          >
            Try Again
          </Button>

          <Button
            size="large"
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md"
          >
            Contact Support
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Cancel;
