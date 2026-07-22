'use client'

import { UseAppData } from "@/hooks/app/useAppData";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type AutomationFlowScreenProps = {
  
}

export const AutomationFlowScreen = ({  }: AutomationFlowScreenProps) => {
  const useAppData = UseAppData()

  return (
    <>
      Bienvenido a automationFlowScreen
    </>
  )
}