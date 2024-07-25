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
              <DropdownMenuItem>See Responses</DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={async () => {
                console.log(row);
                const { data, error } = await handleFormDeletion(
                  row.original.userId!,
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
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(
                  `<iframe src="${process.env.NEXT_PUBLIC_APP_URL!}/forms/${
                    row.original?._id
                  }?userId=${
                    row.original?.userId
                  }" title="FormiVerse"></iframe>`
                );
                toast({
                  variant: "default",
                  title: "Success",
                  description: "Copied Embed Code",
                });
              }}
            >
              Copy Embed Code
            </DropdownMenuItem>
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
      return <div className="font-medium">{moment(time).fromNow()}</div>;
    },
  },
  {
    accessorKey: "data",
    header: () => <div>Data</div>,
    cell: ({ row }) => {
      const data: any = row.getValue("data");
      return (
        <div className="p-4 bg-gray-900 text-white rounded-md dark:text-black dark:bg-white">
          <pre className="overflow-x-auto">
            <code className="text-sm">{JSON.stringify(data, null, 4)}</code>
          </pre>
        </div>
      );
    },
  },
];
