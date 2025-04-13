import { config } from "@/auth";
import CreateEditFormFlow from "@/components/CreateEditFormFlow";
import ProfileForm from "@/components/ProfileForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // Get session from server
  const session = await getServerSession(config);

  // If no session then redirect to login
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="w-full h-full">
      <div className="max-w-full h-full md:max-w-[1000px] mx-auto">
        <CreateEditFormFlow user={session?.user!} />
      </div>
    </div>
  );
}
