"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { FaDownload, FaFilePdf, FaFileCsv } from "react-icons/fa6";
import { VscJson } from "react-icons/vsc";
import { toast } from "./ui/use-toast";

interface IProp {
  data: any[];
}

const DownloadResponseButton: React.FC<IProp> = (props): React.ReactElement => {
  const { data } = props;

  const handleDownloadResponses = (fileType: "CSV" | "JSON" | "PDF") => {
    if (data?.length === 0) {
      toast({
        title: "No response found",
        description: "Please try again after some time",
        variant: "default",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <FaDownload size={16} style={{ marginRight: "6px" }} />
          Download
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleDownloadResponses("JSON")}>
          <VscJson size={16} style={{ marginRight: "6px" }} />
          JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDownloadResponses("CSV")}>
          <FaFileCsv size={16} style={{ marginRight: "6px" }} />
          CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDownloadResponses("PDF")}>
          <FaFilePdf size={16} style={{ marginRight: "6px" }} />
          PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DownloadResponseButton;
