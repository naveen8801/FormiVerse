import { handleGetUserForms } from "@/actions/formActions";
import { auth, config } from "@/auth";
import CreateFormButton from "@/components/CreateFormButton";
import CreateFormWizard from "@/components/CreateFormWizard";
import { DataTable } from "@/components/DateTable";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { FORMS_TABLE_DEFINITION } from "@/constants";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "728ed522f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728epp522f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "78ed5cd2f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728d122f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "728ed522f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728epp522f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "78ed5cd2f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728d122f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "728ed522f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728epp522f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "78ed5cd2f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728d122f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
];

export default async function Dashboard() {
  // Get session from server
  const session = await getServerSession(config);

  // If no session then redirect to login
  if (!session) {
    redirect("/login");
  }

  const { data, error } = await handleGetUserForms(session?.user?.id!);

  return (
    <div className="w-full h-full">
      <div className="w-full flex flex-row items-center justify-end">
        <CreateFormWizard user={session?.user}  />
      </div>

      {data?.length === 0 ? (
        <EmptyState
          text="No Forms Found, Create one by Clicking on Create Form button"
          action={<CreateFormWizard user={session?.user} />}
        />
      ) : (
        <DataTable columns={FORMS_TABLE_DEFINITION} data={payments} />
      )}
    </div>
  );
}
