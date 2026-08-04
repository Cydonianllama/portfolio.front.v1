import { useCallback } from "react"
import { automationFlowGenStore } from "../store/automation.flow.store"

export const useAutomationEditor = () => {

  const automationFlow =  automationFlowGenStore()

  const GetAutomationNodeInformation = useCallback(() => {
    if (
      automationFlow.mode == 'editor' && 
      automationFlow.information?.automation?.isPublished
    ){
      return automationFlow.information?.nodeList?.find(el => el.id == automationFlow.currentNodeIdEditing)
    } else if (
      automationFlow.mode == 'preview' && 
      !automationFlow.information?.automation?.isPublished
    ) {
      return automationFlow.information?.nodeList?.find(el => el.id == automationFlow.currentNodeIdEditing)
    } else if (
      automationFlow.mode == 'preview' && 
      automationFlow.information?.automation?.isPublished
    ) {
      return automationFlow.information?.publishedAutomation?.nodes.find(el => el.id == automationFlow.currentNodeIdEditing)
    }
  }, [automationFlow.information, automationFlow.mode, automationFlow.currentNodeIdEditing])

  return {
    GetAutomationNodeInformation,
  }
}