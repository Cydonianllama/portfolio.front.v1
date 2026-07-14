'use server'

import { LoginScreen } from "@/modules/auth/components/login/LoginScreen"

export default async function Page() {
  return <>
    <LoginScreen/>
  </>
}