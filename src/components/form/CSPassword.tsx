import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";

type TInputProps = {
  label?: string;
  name: string;
  type: string;
  disabled?: boolean;
  rules?: object;
};

const CSPassword = ({ name, label, type, disabled, rules }: TInputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="w-full">
      <Controller
        name={name}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label} labelCol={{ span: 6 }}>
            <Input
              {...field}
              type={name === "password" && passwordVisible ? "text" : type}
              id={name}
              disabled={disabled}
              addonAfter={
                name === "password" && (
                  <div
                    onClick={togglePasswordVisibility}
                    className="cursor-pointer"
                  >
                    {passwordVisible ? (
                      <EyeOutlined />
                    ) : (
                      <EyeInvisibleOutlined />
                    )}
                  </div>
                )
              }
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CSPassword;
