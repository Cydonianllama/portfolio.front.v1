import { useCallback } from "react"
import { automationFlowGenStore } from "../store/automation.flow.store"

export const useAutomationNode = (id: string) => {
  const automationFlow = automationFlowGenStore()

  const getNodeConfiguration = useCallback(() => {
    if (automationFlow.mode == 'editor') {
      return automationFlow.information?.nodeList?.find(el => el.id == id)
    } else if (automationFlow.mode == 'preview') {
      return automationFlow.information?.publishedAutomation?.nodes.find(el => el.id == id)
    }
  }, [automationFlow.information])

  return {
    getNodeConfiguration
  }
}