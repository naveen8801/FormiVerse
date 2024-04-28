"use client";

import Image from "next/image";
import React, { ReactNode } from "react";
import notFoundImg from "../assets/images/not-found.svg";

interface IProp {
  text: string;
  action?: ReactNode;
}

const EmptyState: React.FC<IProp> = (IProp): React.ReactElement => {
  const { text, action } = IProp;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 ">
      <p className="text-sm text-muted-foreground">{text}</p>
      <Image alt="not_found_image" width={200} height={200} src={notFoundImg} />
      {action}
    </div>
  );
};

export default EmptyState;
