"use client";
import React from "react";
import { CardContent } from "./ui/card";
import JsonSchemaForm from "./JsonSchemaForm";

interface IProp {
  formSchema: object;
  uiSchema: object;
  disabled?: boolean;
}

const RenderForm: React.FC<IProp> = (props): React.ReactElement => {
  const { formSchema = {}, uiSchema = {}, disabled = false } = props;
  return (
    <div className="w-full sm:w-full md:w-full xl:w-1/2">
      <div className="text-right px-6">
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
      <CardContent>
        <JsonSchemaForm
          disabled={disabled}
          schema={formSchema}
          uiSchema={uiSchema}
        >
          <></>
        </JsonSchemaForm>
      </CardContent>
    </div>
  );
};

export default RenderForm;
