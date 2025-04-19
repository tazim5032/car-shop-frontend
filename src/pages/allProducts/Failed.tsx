import { Button, Card, Typography, Space } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Failed = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 px-4 py-10">
      <Card
        bordered={false}
        className="w-full max-w-2xl bg-white/90 backdrop-blur-md shadow-xl rounded-3xl text-center p-10 space-y-6 border border-red-100"
      >
        <CloseCircleOutlined className="text-7xl text-red-500" />

        <Title level={2} className="!text-red-600 !mt-2">
          Payment Was Not Successful
        </Title>

        <Text className="text-gray-700 text-base">
          😞 Unfortunately, we couldn’t complete your transaction. This might be
          due to an issue with your payment method or a temporary connection
          error.
        </Text>

        <Space direction="vertical" size={8} className="text-center w-full ">
          <Text className="text-gray-500 text-sm ">
            If the issue continues, you can contact our support team for
            assistance.
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
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md"
          >
            Contact Support
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Failed;
