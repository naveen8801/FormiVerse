import React from "react";
import notFoundImg from "../../../assets/images/not-found.svg";
import Image from "next/image";
import { handleGetUserForms } from "@/actions/formActions";
import RenderForm from "@/components/RenderForm";
import { Base64 } from "js-base64";

export default async function Form({
  params,
  searchParams,
}: {
  params: { formId: string };
  searchParams: { userId: string; disabled?: string };
}) {
  const { userId, disabled = false } = searchParams;
  const formId = params?.formId;

  if (!userId || !formId) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 ">
        <p className="text-sm text-muted-foreground">{"Form Not Found"}</p>
        <Image
          alt="not_found_image"
          width={200}
          height={200}
          src={notFoundImg}
        />
      </div>
    );
  }

  const { data, error } = await handleGetUserForms(userId);
  console.log({ data, formId });
  const form = data?.find((form) => form._id?.toString() === formId);

  if (!form) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 ">
        <p className="text-sm text-muted-foreground">{"Form Not Found"}</p>
        <Image
          alt="not_found_image"
          width={200}
          height={200}
          src={notFoundImg}
        />
      </div>
    );
  }

  const getSchemas = () => {
    try {
      return {
        formSchema: JSON.parse(Base64.decode(form?.formSchema)) || {},
        uiSchema: JSON.parse(Base64.decode(form?.uiSchema || "")) || {},
      };
    } catch (error) {
      return {
        formSchema: {},
        uiSchema: {},
      };
    }
  };

  return (
    <div className="h-full display flex items-center justify-center w-full ">
      <RenderForm
        formSchema={getSchemas()?.formSchema}
        uiSchema={getSchemas()?.uiSchema}
        disabled={disabled ? true : false}
      />
    </div>
  );
}
