'use server'

import AppLayout from "@/layouts/appLayout/layout";
import { AppCydoProvider } from "@/modules/app/components/AppCydoProvider";
import { GetUserInfoService } from "@/modules/app/services/get-userinfo";
import { headers } from "next/headers";
import { cookies } from "next/headers";

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname = usePathname();

  // if (pathname === "/backoffice/login") {
  //   return <>{children}</>;
  // }
  const headersList = await headers();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log('BackofficeLayout: ', token)

  const user = await GetUserInfoService(token || '')

  console.log(user)

  return (
    <AppCydoProvider userData={user?.data.user}>
      <AppLayout>
        {children}
      </AppLayout>
    </AppCydoProvider>
  );
}
