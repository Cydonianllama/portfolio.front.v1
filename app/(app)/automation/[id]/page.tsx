"use server"
import { AutomationFlowScreen } from "@/modules/automation-flows/components/AutomationFlowScreen";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <AutomationFlowScreen automationId={id} />
  );
}