import { automationFlowGenStore } from "../store/automation.flow.store"

export const useAutomationEditor = (nodeId: string) => {

  const automationFlow =  automationFlowGenStore()

  const GetAutomationNodeInformation = () => {
    if (automationFlow.mode == 'editor'){
      return automationFlow.information?.nodeList?.find(el => el.id == nodeId)
    } else if (automationFlow.mode == 'preview') {
      return automationFlow.information?.publishedAutomation?.nodes.find(el => el.id == nodeId)
    }
  }

  return {
    GetAutomationNodeInformation
  }
}