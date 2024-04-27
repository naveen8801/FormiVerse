"use client";
import ThemeSwitcher from "@/helpers/ThemeSwitcher";
import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const NavBar: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full h-28 box-border flex gap-8 justify-between items-center px-16">
      <Link href={"/"}>
        <div className="text-3xl font-extrabold">
          <span className="text-primaryColor">Formi</span>
          <span>Verse</span>
        </div>
      </Link>
      <NavigationMenu className="gap-2">
        <NavigationMenuItem className="list-none">
          <Link href="/signin" legacyBehavior passHref>
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
        <NavigationMenuItem className="list-none ml-4">
          <ThemeSwitcher />
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  );
};

export default NavBar;
