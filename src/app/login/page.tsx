import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
  // Get session from server
  const session = await getServerSession();

  // If no session then redirect to login
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="h-full display flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
