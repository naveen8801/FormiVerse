import Footer from "./../components/Footer";
import NavBar from "./../components/NavBar";
import React from "react";
import { headers } from "next/headers";

interface IProp {
  children?: React.ReactNode;
}

const LayoutProvider: React.FC<IProp> = ({ children }): React.ReactElement => {
  const headersList = headers();
  const header_url = headersList.get("x-url") || "";

  if (header_url?.includes("/forms")) {
    return (
      <div className="h-screen flex flex-col box-border">
        <NavBar hideAuthRelatedInfo />
        <div className="h-full overflow-auto box-border px-16 py-4">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col box-border">
      <NavBar />
      <div className="h-full overflow-auto box-border px-16 py-4">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default LayoutProvider;
