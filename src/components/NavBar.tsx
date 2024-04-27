"use client";
import ThemeSwitcher from "@/helpers/ThemeSwitcher";
import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";

const NavBar: React.FC = (): React.ReactElement => {
  const session = useSession();
  const isAuthenticated = session.status === "authenticated" ? true : false;

  return (
    <div className="w-full h-28 box-border flex gap-8 justify-between items-center px-16">
      <Link href={"/"}>
        <div className="text-3xl font-extrabold">
          <span className="text-primaryColor">Formi</span>
          <span>Verse</span>
        </div>
      </Link>
      <NavigationMenu className="gap-2">
        {isAuthenticated ? (
          <>
            <NavigationMenuItem className="list-none">
              <NavigationMenuLink
                onClick={() => {
                  signOut();
                }}
                className={`${navigationMenuTriggerStyle()} cursor-pointer`}
              >
                Sign Out
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        ) : (
          <>
            <NavigationMenuItem className="list-none">
              <Link href="/signup" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Sign Up
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="list-none">
              <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Sign In
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </>
        )}

        <NavigationMenuItem className="list-none ml-4">
          <ThemeSwitcher />
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  );
};

export default NavBar;
