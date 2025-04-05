import { config } from "@/auth";
import ProfileForm from "@/components/ProfileForm";
import { getServerSession } from "next-auth";

export default async function Profile() {
  // Get session from server
  const session = await getServerSession(config);

  return (
    <div className="w-full h-full">
      <div className="max-w-full h-full md:max-w-[500px] mx-auto">
        <ProfileForm userData={session?.user || {}} />
      </div>
    </div>
  );
}
