"use server"
import { ModulesScreen } from "@/modules/modules-module/modulesScreen";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <ModulesScreen moduleId={id} />
  );
}