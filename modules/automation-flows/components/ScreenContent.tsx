
import { UseAppData } from "@/hooks/app/useAppData";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonPublish } from "./ButtonPublish";
import { ButtonsViewFlow } from "./ButtonsViewFlow";
import { ButtonsMemento } from "./ButtonsMemento";
import { EditorName } from "./EditorName";
import { ContentLoading } from "./states/Content.loading";
import FlowScreen from "../engineSimple/FlowShowcase";
import { edgeTypesConfiguration, nodeTypesConfigurations } from "../_configs";
import { EditorFlow } from "./EditorFlow";
import { useAutomationFlow } from "../store/automation.flow.store";
import { useEffect } from "react";
import { FlowHookActions } from "../hooks/action.hooks.flow";
import { DialogAddTrigger } from "./DialogAddTrigger/DialogAddTrigger";
import { SideSelectorNode } from "./SideSelectorNode/SideSelectorNode";
import { BuildNodeAndEdges } from "../utils/build";
import { ButtonAddNodes } from "./ButtonAddNodes";
import { ReactFlowProvider } from "@xyflow/react";
import { WorkflowEditorProvider } from "./provider/WorkflowEditorProvider";



// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type AutomationFlowScreenProps = {
  automationId: string
}

export const AutomationFlowScreenContent = ({ automationId }: AutomationFlowScreenProps) => {
  const flowActions = FlowHookActions({})

  const useAppData = UseAppData()

  const automationFlowStore = useAutomationFlow()

  const OnClickNode = () => {
    automationFlowStore.setStartEdit({ openEdit: true, currentNodeIdEditing: 'a' })
  }

  useEffect(() => {
    if (automationId) {
      automationFlowStore.setAutomationId({ automationId: automationId })
      flowActions.GetAutomationInformationAction({ automationId: automationId })
    }
  }, [automationId])

  const { edges: fEdges, nodes: fNodes } = BuildNodeAndEdges({ nodes: automationFlowStore.information?.nodeList || [] })

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="h-20 w-full flex items-center justify-between gap-2 border-b border-t px-5">
          <div className="flex items-center gap-2">
            <EditorName />
          </div>
          <div className="flex gap-2 items-center">
            <ButtonsMemento />
            <ButtonsViewFlow />
            <ButtonPublish />
            {/* <ButtonEdit /> */}
          </div>
        </div>
        <div className="flex-1 w-full relative">
          {automationFlowStore.openEdit && (<EditorFlow />)}
          {/* <ContentLoading /> */}
          {(!automationFlowStore.listing && automationFlowStore.initialListFinished) && (<>
            <ReactFlowProvider >
              <FlowScreen
                edgeTypesConfiguration={edgeTypesConfiguration}
                nodeTypesConfigurations={nodeTypesConfigurations}
                edgesF={fEdges}
                nodesF={fNodes}
                onClickNode={OnClickNode}
                nodes_={automationFlowStore.information?.nodeList || []}
              />
            </ReactFlowProvider>
          </>)}
          {automationFlowStore.openSelectNode && <SideSelectorNode />}
          <ButtonAddNodes />
        </div>
      </div>

      <DialogAddTrigger />
    </>
  )
}