import React from "react";
import Form from "@rjsf/fluent-ui";
import validator from "@rjsf/validator-ajv8";

interface IProp {
  formData?: any;
  schema?: any;
  uiSchema?: any;
  onChange?: (formData: any) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const JsonSchemaForm: React.FC<IProp> = (props: any): React.ReactElement => {
  return (
    <Form
      {...props}
      validator={validator}
      omitExtraData
      liveOmit
      liveValidate
      showErrorList
    />
  );
};

export default JsonSchemaForm;
