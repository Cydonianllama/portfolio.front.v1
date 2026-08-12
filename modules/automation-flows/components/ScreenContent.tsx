import { ButtonEdit } from "./ButtonEdit";
import { ButtonPublish } from "./ButtonPublish";
import { EditorName } from "./EditorName";
import FlowScreen from "../engineSimple/FlowShowcase";
import { edgeTypesConfiguration } from "../_configs";
import { EditorFlow } from "./EditorFlow";
import { automationFlowGenStore } from "../store/automation.flow.store";
import { useEffect, useMemo } from "react";
import { useConversationalFlowGenActions } from "../hooks/action.hooks.flow";
import { DialogAddTrigger } from "./DialogAddTrigger/DialogAddTrigger";
import { RequestServiceDialog } from "./DialogRequestService/RequestServiceDialog";
import { SideSelectorNode } from "./SideSelectorNode/SideSelectorNode";
import { ButtonAddNodes } from "./ButtonAddNodes";
import { useFlosStateMachineHookActions } from "../hooks/hook.state.machine";
import { ButtonSave } from "./buttonSave";
import { ButtonBack } from "./ButtonBack";
import { useAutomationNodeRegistry } from "../registry/useAutomationNodeRegistry";
import { withNodeDefinition } from "../registry/wrappers";
import { useAutomationFlowchartBreadcrumb } from "../appHooks/useAutomationFlowBreadcrumb";

type AutomationFlowScreenProps = {
  automationId: string
}

export const AutomationFlowScreenContent = ({ automationId }: AutomationFlowScreenProps) => {

  useAutomationFlowchartBreadcrumb()

  const flowActions = useConversationalFlowGenActions({})

  const { showEditButton, disabledSaveButton, showPublishButton, showSaveButton, canEditGeneralFlowchart } = useFlosStateMachineHookActions({})

  const automationFlowStore = automationFlowGenStore()
  const registry = useAutomationNodeRegistry()

  const nodeTypesConfigurations = useMemo(
    () => Object.fromEntries(registry.map((definition) => [definition.type, withNodeDefinition(definition, registry)])),
    [registry],
  )

  useEffect(() => {
    if (automationId) {
      automationFlowStore.setAutomationId({ automationId: automationId })
      flowActions.GetAutomationInformationAction({ automationId: automationId })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [automationId])

  useEffect(() => {
    return () => {
      automationFlowStore.clearAllStates()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="h-12 w-full flex items-center justify-between gap-2 border-b border-t px-2">
          <div className="flex items-center gap-2">
            <ButtonBack />
            <EditorName />
          </div>
          <div className="flex gap-2 items-center">
            {showSaveButton && (
              <ButtonSave
                disabled={disabledSaveButton}
              />
            )}

            {showPublishButton && (
              <ButtonPublish />
            )}

            {showEditButton && (
              <ButtonEdit />
            )}

          </div>
        </div>
        <div className="flex-1 w-full relative">
          {(automationFlowStore.openEdit && automationFlowStore.mode == 'editor') && (<EditorFlow />)}
          {(!automationFlowStore.listing && automationFlowStore.initialListFinished) && (<>
            <FlowScreen
              edgeTypesConfiguration={edgeTypesConfiguration}
              nodeTypesConfigurations={nodeTypesConfigurations}
            />
          </>)}

          {(!canEditGeneralFlowchart && !automationFlowStore.listing && automationFlowStore.initialListFinished) && (
            <div className="absolute inset-x-0 bottom-4 z-20 flex justify-center pointer-events-none">
              <div className="pointer-events-auto flex items-center gap-3 rounded-lg border-2 border-amber-400 bg-amber-50 px-4 py-2.5 shadow-md">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                <div className="text-xs">
                  <span className="font-semibold text-amber-700">Estás en modo previsualización</span>
                  <span className="text-amber-600/90"> — presiona el botón <strong className="text-amber-700 underline decoration-amber-400 underline-offset-2">Editar</strong> para poder modificar el flujo.</span>
                </div>
              </div>
            </div>
          )}

          {(automationFlowStore.openSelectNode && automationFlowStore.mode == 'editor') && <SideSelectorNode />}
          <ButtonAddNodes />
        </div>
      </div>

      <DialogAddTrigger />
      <RequestServiceDialog />
    </>
  )
}
