'use client'
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useAppData } from "@/hooks/app/useAppData";
import { AutomationSection } from "./content";
import { DialogAutomationTest } from "../automation-test/components/DialogAutomationTest";
import { LayoutScreen } from "@/components/layoutScreen";
import { useAutomationBreadcrumb } from "./hooks/useAutomationBreadcrumb";
type AutomationScreenProps = {

}

export const AutomationScreen = ({ }: AutomationScreenProps) => {
  useAutomationBreadcrumb()
  const appData = useAppData()

  return (
    <>
      <LayoutScreen domConfig={{}} layoutFor="table" >
        <AutomationSection />
        <DialogAutomationTest />
      </LayoutScreen>
    </>
  )
}