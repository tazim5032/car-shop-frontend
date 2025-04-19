import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHselectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: undefined | "multiple";
  rules?: object;
};

const CSSelect = ({
  label,
  name,
  options,
  disabled,
  mode,
  rules,
}: TPHselectProps) => {
  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label} labelCol={{ span: 6 }}>
          <Select
            mode={mode}
            style={{ width: "100%" }}
            {...field}
            options={options}
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CSSelect;
