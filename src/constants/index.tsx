"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuMoreHorizontal, LuArrowUpDown } from "react-icons/lu";
import { IForm, IFormResponse } from "@/types";
import moment from "moment";
import Link from "next/link";
import { handleFormDeletion } from "@/actions/formActions";
import { toast } from "@/components/ui/use-toast";
import { generateEmbedCodeForForm } from "@/lib/utils";
import { FaCopy } from "react-icons/fa6";
import { FaDeleteLeft, FaCode, FaEye, FaList } from "react-icons/fa6";

export const FORMS_TABLE_DEFINITION: ColumnDef<IForm>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "createdAt",
    header: () => <div>Created At</div>,
    cell: ({ row }) => {
      const time: any = row.getValue("createdAt");
      return <div className="font-medium">{moment(time).fromNow()}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div>Actions</div>,
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <LuMoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={`/dashboard/response/${row.original._id}`}>
              <DropdownMenuItem>
                <FaList size={18} className="mr-2" />
                See Responses
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={async () => {
                console.log(row);
                const { data, error } = await handleFormDeletion(
                  row.original._id!
                );
                if (error) {
                  toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error?.toString(),
                  });
                }
                if (data) {
                  toast({
                    variant: "default",
                    title: "Success",
                    description: "Form deleted successfully",
                  });
                }
              }}
            >
              <FaDeleteLeft size={18} className="mr-2" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(
                  generateEmbedCodeForForm(row.original?._id!)
                );
                toast({
                  variant: "default",
                  title: "Success",
                  description: "Copied Embed Code",
                });
              }}
            >
              <FaCode size={18} className="mr-2" />
              Copy Embed Code
            </DropdownMenuItem>
            <Link
              href={`/forms/${row.original?._id}&disabled=true`}
              target="_blank"
            >
              <DropdownMenuItem>
                <FaEye size={18} className="mr-2" />
                Preview Form
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const RESPONSE_TABLE_DEFINITION: ColumnDef<IFormResponse>[] = [
  {
    accessorKey: "createdAt",
    header: () => <div>Created At</div>,
    cell: ({ row }) => {
      const time: any = row.getValue("createdAt");
      return (
        <div>
          <strong>{moment(time).fromNow()}</strong>
          <p className="text-slate-500 dark:text-slate-400">
            {moment(time).toDate().toString()}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "data",
    header: () => <div>Data</div>,
    cell: ({ row }) => {
      const data: any = row.getValue("data");
      return (
        <div className="p-4 bg-gray-900 text-white rounded-md relative">
          <div className="absolute top-0 right-0 p-4 z-10">
            <FaCopy
              className="cursor-pointer"
              size={20}
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(data));
                toast({
                  variant: "default",
                  title: "Success",
                  description: "Data Copied",
                });
              }}
            />
          </div>
          <pre className="overflow-x-auto">
            <code className="text-sm">{JSON.stringify(data, null, 4)}</code>
          </pre>
        </div>
      );
    },
  },
];
