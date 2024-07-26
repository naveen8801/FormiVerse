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
  filename?: string;
}

const DownloadResponseButton: React.FC<IProp> = (props): React.ReactElement => {
  const { data, filename } = props;

  const generateAndDownloadJSONFile = (data: any[]) => {
    // Convert JSON data to a string
    const jsonString = JSON.stringify(data);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: "application/json" });

    // Create a link element
    const link = document.createElement("a");

    // Set the download attribute with a filename
    link.download = `${filename}.json`;

    // Create an object URL for the Blob and set it as the href attribute
    link.href = window.URL.createObjectURL(blob);

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up by removing the link
    link.parentNode!.removeChild(link);
  };

  const handleDownloadResponses = (fileType: "CSV" | "JSON" | "PDF") => {
    // if (data?.length === 0) {
    //   toast({
    //     title: "No response found",
    //     description: "Please try again after some time",
    //     variant: "default",
    //   });
    // }

    if (fileType === "JSON") {
      generateAndDownloadJSONFile(data);
    }
    if (fileType === "CSV") {
    }
    if (fileType === "PDF") {
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
