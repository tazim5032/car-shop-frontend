import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  label?: string;
  name: string;
  type: string;
  disabled?: boolean;
  rules?: object;
  accept?: string;
};

const CSInput = ({
  name,
  label,
  type,
  disabled,
  rules,
  accept,
}: TInputProps) => {
  return (
    <div>
      <Controller
        name={name}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Form.Item label={label} labelCol={{ span: 6 }}>
            {type === "file" ? (
              <input
                type="file"
                id={name}
                accept={accept}
                onChange={(e) => onChange(e.target.files)}
                disabled={disabled}
              />
            ) : (
              <Input
                type={type}
                id={name}
                value={value ?? ""}
                onChange={onChange}
                disabled={disabled}
              />
            )}
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CSInput;
