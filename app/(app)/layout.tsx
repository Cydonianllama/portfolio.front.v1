/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import AppLayout from "@/layouts/appLayout/layout";
import { BootstrapProvider } from "@/modules/app/components/BootstrapProvider";
import { headers } from "next/headers";
import { cookies } from "next/headers";
import { BootstrapApp } from "@/server/bootstrap/app.bootstrap";
import { redirect } from "next/navigation";

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // const pathname = usePathname();
  // if (pathname === "/backoffice/login") {
  //   return <>{children}</>;
  // }

  // const headersList = await headers();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const bootstrap = await BootstrapApp({
    token: token || ''
  })

  if (bootstrap?.user){
    if (!bootstrap.user.isVerified){
      redirect('/onboarding')
    }

    if (!bootstrap.user.isOnboardingFinished){
      redirect('/onboarding')
    }
  }

  return (
    <BootstrapProvider userData={bootstrap?.user} workspaces={bootstrap?.workspaces || []} >
      <AppLayout>
        {children}
      </AppLayout>
    </BootstrapProvider>
  );
}
