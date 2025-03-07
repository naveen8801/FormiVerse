"use client";
import React, { useEffect, useState } from "react";
import DownloadResponseButton from "./DownloadResponseButton";
import { IFormResponse } from "@/types";
import moment from "moment";
import Link from "next/link";
import { Button } from "./ui/button";
import { FaEye } from "react-icons/fa6";
import { RESPONSE_TABLE_DEFINITION } from "@/constants";
import { DataTable } from "./DateTable";
import EmptyState from "./EmptyState";
import { FaClock } from "react-icons/fa6";
import { getFormResponsesById } from "@/actions/formActions";

interface IProp {
  formId: string;
  session: any;
  initialData: any;
}

const ResponseView: React.FC<IProp> = (props): React.ReactElement => {
  const { formId, session, initialData } = props;
  const [data, setData] = useState<any>({ responses: [] });
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setData(initialData);
  }, []);

  useEffect(() => {
    setInterval(async () => {
      await fetchResponseInRealtime();
    }, 5000);
  }, []);

  const fetchResponseInRealtime = async () => {
    setIsFetching(true);
    const { data, error } = await getFormResponsesById(formId);

    if (data) {
      setData(data);
    }
    setIsFetching(false);
  };

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
    <div>
      <div className="w-full flex flex-row items-center justify-end gap-4">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {isFetching ? "Updating..." : "View will update every 5 seconds"}
        </span>
        {data?.responses?.length > 0 && (
          <>
            <DownloadResponseButton
              filename={`Form Response-${formId}`}
              data={getCleanedResponseData(
                data?.responses?.sort(
                  (a: any, b: any) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                ) || []
              )}
            />
            <Link
              href={`/forms/${formId}?userId=${session?.user?.id}&disabled=true`}
              target="_blank"
            >
              <Button>
                <FaEye size={16} style={{ marginRight: "6px" }} /> Preview
              </Button>
            </Link>
            <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 px-0 py-0">
              <FaClock size={16} className="text-gray-800 dark:text-white" />
              Created {moment(data?.createdAt).fromNow()}
            </span>
          </>
        )}
      </div>
      {!data || data?.responses?.length === 0 ? (
        <EmptyState text="No responses Found" />
      ) : (
        <DataTable
          disableFiltering
          columns={RESPONSE_TABLE_DEFINITION}
          data={
            data?.responses?.sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            ) || []
          }
        />
      )}
    </div>
  );
};

export default ResponseView;
