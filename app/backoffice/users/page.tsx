"use server";

import { UserTableScreen } from "@/modules/backoffice/user/componets/userTableScreen";
import { UsersScreen } from '@/modules/backoffice/users/components'

export default async function Page() {
  return (<>
    <UsersScreen/>
  </>);
}
