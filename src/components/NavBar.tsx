import Link from "next/link";
import React from "react";

const NavBar: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full h-28 box-border flex gap-8 justify-between items-center px-16">
      <Link href={"/"}>
        <div className="text-3xl font-extrabold">
          <span className="text-primaryColor">Formi</span>
          <span>Verse</span>
        </div>
      </Link>
    </div>
  );
};

export default NavBar;
