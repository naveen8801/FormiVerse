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
import jsPDF from "jspdf";
import "jspdf-autotable";

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

  const generateAndDownloadCSVFile = (data: any[]) => {
    // CSV data to be downloaded
    const csvData = [["Created At", "Data"]];

    for (let i = 0; i < data?.length; i++) {
      csvData.push([data?.[i]?.createdAt, JSON.stringify(data?.[i]?.data)]);
    }

    // Function to escape double quotes in JSON string
    const escapeJSONString = (str: string) => str.replace(/"/g, '""');

    // Convert array to CSV string
    const csvString = csvData
      .map((row) =>
        row.map((value) => `"${escapeJSONString(value.toString())}"`).join(",")
      )
      .join("\n");

    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: "text/csv" });

    // Create a link element
    const link = document.createElement("a");

    // Set the download attribute with a filename
    link.download = `${filename}.csv`;

    // Create an object URL for the Blob and set it as the href attribute
    link.href = window.URL.createObjectURL(blob);

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up by removing the link
    link.parentNode!.removeChild(link);
  };

  const generateAndDownloadPDFFile = (data: any[]) => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add a title
    doc.setFontSize(18);
    doc.text(`Responses`, 14, 22);
    doc.setFontSize(12);
    doc.setTextColor(99);

    // Define table columns and rows
    const columns = ["Created At", "Data"];
    const rows = data.map((item) => [
      item?.createdAt,
      JSON.stringify(item.data, null, 2),
    ]);

    // Add table to the PDF
    // @ts-ignore
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 30,
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: 255,
        fontStyle: "bold",
      },
      bodyStyles: { fillColor: [240, 240, 240] },
      margin: { top: 30 },
      styles: { font: "helvetica", fontSize: 10 },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: "auto" },
        2: { cellWidth: "auto" },
        3: { cellWidth: "auto" },
      },
      didDrawPage: (data: any) => {
        // Add watermark at footer
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(10);
          doc.setTextColor(150);
          doc.text("Generated by FormiVerse", 14, 10); // Adjusted position to the top
        }
      },
    });

    // Save the PDF
    doc.save(`${filename}.pdf`);
  };

  const handleDownloadResponses = (fileType: "CSV" | "JSON" | "PDF") => {
    if (data?.length === 0) {
      toast({
        title: "No response found",
        description: "Please try again after some time",
        variant: "default",
      });
    }

    if (fileType === "JSON") {
      generateAndDownloadJSONFile(data);
    }
    if (fileType === "CSV") {
      generateAndDownloadCSVFile(data);
    }
    if (fileType === "PDF") {
      generateAndDownloadPDFFile(data);
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