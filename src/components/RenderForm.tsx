"use client";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import JsonSchemaForm from "./JsonSchemaForm";
import { handleSubmitFormResponse } from "@/actions/formActions";
import { toast } from "./ui/use-toast";

interface IProp {
  formSchema: object;
  uiSchema: object;
  disabled?: boolean;
  userId: string;
  formId: string;
}

const RenderForm: React.FC<IProp> = (props): React.ReactElement => {
  const {
    userId,
    formId,
    formSchema = {},
    uiSchema = {},
    disabled = false,
  } = props;
  const [data, setData] = useState<any>({});
  const handleFormSubmission = async (payload: any) => {
    const { data, error } = await handleSubmitFormResponse(
      userId,
      formId,
      payload
    );
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.toString(),
      });
    }
    if (data) {
      setData({});
      toast({
        variant: "default",
        title: "Success",
        description: "Response saved successfully",
      });
    }
  };

  return (
    <div className="w-full sm:w-full md:w-full xl:w-1/2">
      <div className="text-right my-2">
        <p className="text-sm text-gray-600">
          Powered by{" "}
          <a
            href={process.env.NEXT_PUBLIC_APP_URL!}
            target="_blank"
            className="font-semibold text-blue-500 hover:text-blue-700"
          >
            FormiVerse
          </a>
        </p>
      </div>
      <Card className="row-span-1 h-full">
        <CardContent>
          <JsonSchemaForm
            disabled={disabled}
            liveOmit={true}
            liveValidate={true}
            schema={formSchema}
            uiSchema={uiSchema}
            formData={data}
            onChange={(evt: any) => setData(evt?.formData)}
            onSubmit={(evt: any) => {
              handleFormSubmission(evt?.formData);
            }}
          ></JsonSchemaForm>
        </CardContent>
      </Card>
    </div>
  );
};

export default RenderForm;
