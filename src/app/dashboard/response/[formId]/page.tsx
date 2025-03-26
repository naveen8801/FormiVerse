import React from "react";
import notFoundImg from "../../../../assets/images/not-found.svg";
import Image from "next/image";
import { getFormResponsesById } from "@/actions/formActions";
import RenderForm from "@/components/RenderForm";
import { Base64 } from "js-base64";
import { getServerSession } from "next-auth";
import { config } from "@/auth";
import EmptyState from "@/components/EmptyState";
import moment from "moment";
import { FaClock } from "react-icons/fa6";
import { DataTable } from "@/components/DateTable";
import { RESPONSE_TABLE_DEFINITION } from "@/constants";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaEye } from "react-icons/fa6";
import Link from "next/link";
import DownloadResponseButton from "@/components/DownloadResponseButton";
import { IFormResponse } from "@/types";
import ResponseView from "@/components/ResponseView";

export default async function FormResponse({
  params,
}: {
  params: { formId: string };
}) {
  const formId = params?.formId;

  // Get session from server
  const session = await getServerSession(config);

  // If no session then redirect to login
  if (!session) {
    redirect("/login");
  }

  const { data, error } = await getFormResponsesById(formId);

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 ">
        <p className="text-sm text-muted-foreground">{"No Response Found"}</p>
        <Image
          alt="not_found_image"
          width={200}
          height={200}
          src={notFoundImg}
        />
      </div>
    );
  }

  const getCleanedResponseData = (responses: IFormResponse[]) => {
    let res: any = [];
    responses?.forEach((response) => {
      let obj = {
        createdAt: moment(response?.createdAt).toDate().toString(),
        data: response?.data,
      };
      res.push(obj);
    });
    return res;
  };

  return (
    <div className="w-full h-full">
      <ResponseView session={session} formId={formId} initialData={data} />
    </div>
  );
}
