"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import JsonSchemaForm from "./JsonSchemaForm";
import { handleSubmitFormResponse } from "@/actions/formActions";
import { toast } from "./ui/use-toast";
import { useTheme } from "next-themes";

interface IProp {
  formSchema: object;
  uiSchema: object;
  disabled?: boolean;
  formId: string;
}

const RenderForm: React.FC<IProp> = (props): React.ReactElement => {
  const { formId, formSchema = {}, uiSchema = {}, disabled = false } = props;
  const { setTheme } = useTheme();
  const [data, setData] = useState<any>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme("light");
    setMounted(true);
  }, []);

  const handleFormSubmission = async (payload: any) => {
    const { data, error } = await handleSubmitFormResponse(formId, payload);
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
      {mounted && (
        <>
          <JsonSchemaForm
            disabled={disabled}
            schema={formSchema}
            uiSchema={uiSchema}
            formData={data}
            onChange={(evt: any) => setData(evt?.formData)}
            onSubmit={(evt: any) => {
              handleFormSubmission(evt?.formData);
            }}
          ></JsonSchemaForm>
          <div className=" my-2">
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
        </>
      )}
    </div>
  );
};

export default RenderForm;
