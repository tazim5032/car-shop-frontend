import { Spin } from "antd";
const contentStyle: React.CSSProperties = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};
const content = <div style={contentStyle} />;

const Loading = () => {
  return (
    <div className="flex justify-center mt-10">
      <Spin tip="Loading..." size="large">
        {content}
      </Spin>
    </div>
  );
};

export default Loading;
