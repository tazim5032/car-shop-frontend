import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

const { TextArea } = Input;

type TInputProps = {
  label?: string;
  name: string;
  disabled?: boolean;
  rules?: object;
};

const CSTextArea = ({ name, label, disabled, rules }: TInputProps) => {
  return (
    <div>
      <Controller
        name={name}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label} labelCol={{ span: 6 }}>
            <TextArea id={name} {...field} disabled={disabled} />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CSTextArea;
