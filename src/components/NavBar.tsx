"use client";
import ThemeSwitcher from "@/helpers/ThemeSwitcher";
import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

const NavBar: React.FC<{ hideAuthRelatedInfo?: boolean }> = (
  props
): React.ReactElement => {
  const { hideAuthRelatedInfo = false } = props;
  const session = useSession();
  const isAuthenticated = session.status === "authenticated" ? true : false;
  const user = session?.data?.user;

  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ];

  return (
    <div className="w-full h-28 box-border flex gap-8 justify-between items-center px-16">
      <Link href={"/"}>
        <div className="text-3xl font-extrabold">
          <span className="text-primaryColor">Formi</span>
          <span>Verse</span>
        </div>
      </Link>
      <NavigationMenu className="gap-2">
        <NavigationMenuList>
          {isAuthenticated ? (
            <>
              <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Account</NavigationMenuTrigger>
                <NavigationMenuContent className="p-3 min-w-[220px] bg-white dark:bg-black rounded-lg shadow-lg border border-gray-100 dark:border-gray-800">
                  <div className="flex flex-col gap-3">
                    <div className="px-2 py-1 text-sm font-medium text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">{`Hey ${user?.username} 👋`}</div>
                    <ul className="flex flex-col w-full">
                      <Link href="/dashboard/profile" legacyBehavior passHref>
                        <li className="px-2 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md cursor-pointer flex items-center gap-2 text-gray-800 dark:text-white">
                          <FaUser />
                          Profile
                        </li>
                      </Link>
                      <li
                        onClick={() => {
                          signOut({ redirect: true, callbackUrl: "/" });
                        }}
                        className="px-2 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md cursor-pointer flex items-center gap-2 text-red-600 dark:text-red-400"
                      >
                        <FaSignOutAlt />
                        Sign out
                      </li>
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </>
          ) : (
            <>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/signup" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Sign Up
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
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
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavBar;
