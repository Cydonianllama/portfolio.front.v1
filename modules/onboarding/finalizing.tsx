'use client'

import { UseAppData } from "@/hooks/app/useAppData";
import { useRouter } from "next/navigation"; 
import { useOnboarding } from "./store";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type FinalizingProps = {

}

export const Finalizing = ({ }: FinalizingProps) => {
  const useAppData = UseAppData()

  const onboarding = useOnboarding()
  const router = useRouter()

  useEffect(() => {
    if (onboarding.step == 3) {
      router.push('/home')
    }
  }, [onboarding.step])

  return (
    <>
      Finalizando
    </>
  )
}