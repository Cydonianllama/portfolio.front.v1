'use client'

import { ReactFlowProvider } from "@xyflow/react";
import { WorkflowEditorProvider } from "./provider/WorkflowEditorProvider";
import { AutomationFlowScreenContent } from "./ScreenContent";
import { AutomationNodeRegistryProvider } from "../registry/AutomationNodeRegistryProvider";

type AutomationFlowScreenProps = {
  automationId: string
}

export const AutomationFlowScreen = ({ automationId }: AutomationFlowScreenProps) => {
  return (
    <>
      <ReactFlowProvider>
        <WorkflowEditorProvider>
          <AutomationNodeRegistryProvider>
            <AutomationFlowScreenContent automationId={automationId} />
          </AutomationNodeRegistryProvider>
        </WorkflowEditorProvider>
      </ReactFlowProvider>
    </>
  )
}
