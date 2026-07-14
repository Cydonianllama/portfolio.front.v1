'use server'

import { InviteScreen } from "@/modules/invite/InviteScreen"

export default async function Page() {

  // if (process.env.NODE_ENV == 'production'){
  //   notFound();
  // }

  return <>
    <InviteScreen />
  </>
}