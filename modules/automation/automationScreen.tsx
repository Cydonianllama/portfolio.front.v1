'use client'
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { UseAppData } from "@/hooks/app/useAppData";
import { AutomationSection } from "./scratch_withouttanstack";
import { DialogAutomationTest } from "../automation-test/components/DialogAutomationTest";
type AutomationScreenProps = {
  
}

export const AutomationScreen = ({  }: AutomationScreenProps) => {
  const useAppData = UseAppData()

  return (
    <>
      <AutomationSection />
      <DialogAutomationTest />
    </>
  )
}