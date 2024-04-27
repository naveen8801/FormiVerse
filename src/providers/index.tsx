import React from "react";
import LayoutProvider from "./LayoutProvider";
import MyThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";
import { getServerSession } from "next-auth";
import { Toaster } from "@/components/ui/sonner";

interface IProp {
  children?: React.ReactNode;
}

const MainProvider: React.FC<IProp> = async ({ children }) => {
  const session = await getServerSession();

  return (
    <div>
      <MyThemeProvider>
        <AuthProvider session={session}>
          <LayoutProvider>{children}</LayoutProvider>
        </AuthProvider>
      </MyThemeProvider>
      <Toaster position="top-center" />
    </div>
  );
};

export default MainProvider;
