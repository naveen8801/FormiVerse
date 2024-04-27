import { redirect } from "next/navigation";

export default function Home() {
  // No / route
  redirect("/login");

  // No / route
  return <></>;
}
