import React from "react";
import notFoundImg from "../../../../assets/images/not-found.svg";
import Image from "next/image";
import { getFormResponsesById } from "@/actions/formActions";
import RenderForm from "@/components/RenderForm";
import { Base64 } from "js-base64";
import { getServerSession } from "next-auth";
import { config } from "@/auth";
import EmptyState from "@/components/EmptyState";

export default async function FormResponse({
  params,
}: {
  params: { formId: string };
}) {
  const formId = params?.formId;

  // Get session from server
  const session = await getServerSession(config);

  const { data, error } = await getFormResponsesById(
    session?.user?._id,
    formId
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
      {!data || data?.length === 0 ? (
        <EmptyState text="No responses Found" />
      ) : (
        <></>
        // <DataTable columns={FORMS_TABLE_DEFINITION} data={returnTableData()} />
      )}
    </div>
  );
}
