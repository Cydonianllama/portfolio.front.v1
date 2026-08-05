'use client'
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useAppData } from "@/hooks/app/useAppData";
import { AutomationSection } from "./scratch_withouttanstack";
import { DialogAutomationTest } from "../automation-test/components/DialogAutomationTest";
type AutomationScreenProps = {

}

export const AutomationScreen = ({ }: AutomationScreenProps) => {
  const appData = useAppData()

  return (
    <>
      <div className="app-section">
        <AutomationSection />
        <DialogAutomationTest />
      </div>
    </>
  )
}