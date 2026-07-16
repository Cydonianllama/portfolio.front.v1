'use client'
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { UseAppData } from "@/hooks/app/useAppData";
import { AutomationSection } from "./scratch_withouttanstack";
type AutomationScreenProps = {
  
}

export const AutomationScreen = ({  }: AutomationScreenProps) => {
  const useAppData = UseAppData()

  return (
    <>
      <AutomationSection />
    </>
  )
}