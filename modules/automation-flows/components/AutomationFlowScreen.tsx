'use client'
;
import { WorkflowEditorProvider } from "./provider/WorkflowEditorProvider";
import { AutomationFlowScreenContent } from "./ScreenContent";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type AutomationFlowScreenProps = {
  automationId: string
}

export const AutomationFlowScreen = ({ automationId }: AutomationFlowScreenProps) => {
  return (
    <>
      <WorkflowEditorProvider>
        <AutomationFlowScreenContent  automationId={automationId} />
      </WorkflowEditorProvider>

    </>
  )
}