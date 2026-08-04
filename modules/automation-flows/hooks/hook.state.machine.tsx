import { useCallback, useEffect } from "react"
import { toast } from "sonner"
import { automationFlowGenStore } from "../store/automation.flow.store"
import { nodeTypes } from '@erick/conversationalflow'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type FlosStateMachineHookProps = {

}

import { useMemo } from "react";

export const useFlosStateMachineHookActions = ({}: FlosStateMachineHookProps) => {
  const automationFlowStore = automationFlowGenStore();

  return useMemo(() => {
    // console.log("useFlosStateMachineHookActions");

    return {
      showSaveButton:
        automationFlowStore.mode !== "preview" &&
        !!(
          automationFlowStore.information?.automation?.hasChanges &&
          automationFlowStore.information?.automation?.isPublished
        ),

      showPublishButton:
        automationFlowStore.mode !== "editor" &&
        !automationFlowStore.information?.automation?.isPublished,

      showEditButton:
        automationFlowStore.mode !== "editor" &&
        !!(
          automationFlowStore.information?.automation?.isPublished
        ),

      canMoveNodes: !!(automationFlowStore.mode == "editor"),

      isInitialFlow:
        automationFlowStore.information?.nodeList?.length === 1 &&
        !!automationFlowStore.information?.nodeList?.find(
          el => el.type === nodeTypes.NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING
        ),
    };
  }, [
    automationFlowStore.mode,
    automationFlowStore.information?.automation?.hasChanges,
    automationFlowStore.information?.automation?.isPublished,
    automationFlowStore.information?.nodeList,
  ]);
};