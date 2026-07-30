
import { UseAppData } from "@/hooks/app/useAppData";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonPublish } from "./ButtonPublish";
import { ButtonsViewFlow } from "./ButtonsViewFlow";
import { ButtonsMemento } from "./ButtonsMemento";
import { EditorName } from "./EditorName";
import FlowScreen from "../engineSimple/FlowShowcase";
import { edgeTypesConfiguration, nodeTypesConfigurations } from "../_configs";
import { EditorFlow } from "./EditorFlow";
import { automationFlowGenStore } from "../store/automation.flow.store";
import { useEffect } from "react";
import { useConversationalFlowGenActions } from "../hooks/action.hooks.flow";
import { DialogAddTrigger } from "./DialogAddTrigger/DialogAddTrigger";
import { SideSelectorNode } from "./SideSelectorNode/SideSelectorNode";
import { ButtonAddNodes } from "./ButtonAddNodes";


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type AutomationFlowScreenProps = {
  automationId: string
}

export const AutomationFlowScreenContent = ({ automationId }: AutomationFlowScreenProps) => {
  const flowActions = useConversationalFlowGenActions({})

  const useAppData = UseAppData()

  const automationFlowStore = automationFlowGenStore()

  const OnClickNode = () => {
    automationFlowStore.setStartEdit({ openEdit: true, currentNodeIdEditing: 'a' })
  }

  useEffect(() => {
    if (automationId) {
      automationFlowStore.setAutomationId({ automationId: automationId })
      flowActions.GetAutomationInformationAction({ automationId: automationId })
    }
  }, [automationId])


  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="h-20 w-full flex items-center justify-between gap-2 border-b border-t px-2">
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
              <FlowScreen
                edgeTypesConfiguration={edgeTypesConfiguration}
                nodeTypesConfigurations={nodeTypesConfigurations}
              />
          </>)}
          {automationFlowStore.openSelectNode && <SideSelectorNode />}
          <ButtonAddNodes />
        </div>
      </div>

      <DialogAddTrigger />
    </>
  )
}