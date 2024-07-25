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

  const { data, error } = await getFormResponsesById(
    session?.user?.id,
    formId,
    true
  );

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

  return (
    <div className="w-full h-full">
      <div className="w-full flex flex-row items-center justify-end gap-4">
        <span></span>
        <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 px-0 py-0">
          <FaClock size={16} className="text-gray-800 dark:text-white" />
          Created {moment(data?.createdAt).fromNow()}
        </span>
      </div>
      {!data || data?.responses?.length === 0 ? (
        <EmptyState text="No responses Found" />
      ) : (
        <DataTable
          columns={RESPONSE_TABLE_DEFINITION}
          data={data?.responses || []}
        />
      )}
    </div>
  );
}
