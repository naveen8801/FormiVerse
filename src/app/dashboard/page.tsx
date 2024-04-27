import { handleGetUserForms } from "@/actions/formActions";
import { auth, config } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // Get session from server
  const session = await getServerSession(config);

  // If no session then redirect to login
  if (!session) {
    redirect("/login");
  }

  const { data, error } = await handleGetUserForms(session?.user?.id!);

  return <>{}</>;
}
