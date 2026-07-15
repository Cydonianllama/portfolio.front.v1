'use server'
import { redirect } from "next/navigation";
import { InviteScreen } from "@/modules/invite/InviteScreen"

type PageProps = {
  searchParams: Promise<{
    invitationId?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { invitationId } = await searchParams;

  // reirect to login if code query dont exist
  if (!invitationId){
    redirect('/login')
  }

  return <>
    <InviteScreen  invitationId={invitationId || ''} />
  </>
}