/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TformConfigs = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFromProps = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TformConfigs;

const CSForm = ({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: TFromProps) => {
  const formConfig: TformConfigs = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };
  return (
    <div>
      <FormProvider {...methods}>
        <Form onFinish={methods.handleSubmit(submit)}>{children}</Form>
      </FormProvider>
    </div>
  );
};

export default CSForm;
