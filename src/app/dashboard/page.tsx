import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // Get session from server
  const session = await getServerSession();

  // If no session then redirect to login
  if (!session) {
    redirect("/login");
  }

  return <>Dashboard</>;
}
