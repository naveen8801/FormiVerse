import { handleGetUserForms } from "@/actions/formActions";
import { config } from "@/auth";
import { DataTable } from "@/components/DateTable";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { FORMS_TABLE_DEFINITION } from "@/constants";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LuMoreHorizontal, LuPlusSquare } from "react-icons/lu";

export default async function Dashboard() {
  // Get session from server
  const session = await getServerSession(config);

  // If no session then redirect to login
  if (!session) {
    redirect("/login");
  }

  const { data, error } = await handleGetUserForms(session?.user?.id!);

  const returnTableData = () => {
    if (data) {
      let res = data?.map((form) => {
        return {
          _id: form._id,
          title: form?.title || "",
          description: form?.description || "",
          formSchema: form?.formSchema || "",
          uiSchema: form?.uiSchema || "",
          createdAt: form?.createdAt,
          modifiedAt: form?.createdAt,
          author: form?.author,
          userId: session?.user?.id,
        };
      });
      return res?.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    return [];
  };

  return (
    <div className="w-full h-full">
      {!data || data?.length === 0 ? (
        <EmptyState
          text="No Forms Found, Create one by Clicking on Create Form button"
          action={
            <Button asChild variant="default">
              <Link href="/dashboard/forms/create">
                <LuPlusSquare size={18} className="mr-2" />
                Create Form
              </Link>
            </Button>
          }
        />
      ) : (
        <DataTable
          session={session}
          columns={FORMS_TABLE_DEFINITION}
          data={returnTableData()}
        />
      )}
    </div>
  );
}
