import { useCallback } from "react"
import { automationFlowGenStore } from "../store/automation.flow.store"

export const useAutomationNode = (id: string) => {
  const information = automationFlowGenStore(state => state.information)
  const mode = automationFlowGenStore(state => state.mode)

  const getNodeConfiguration = useCallback(() => {
      if (
      mode == 'editor' && 
      information?.automation?.isPublished
    ){
      return information?.nodeList?.find(el => el.id == id)
    } else if (
      mode == 'preview' && 
      !information?.automation?.isPublished
    ) {
      return information?.nodeList?.find(el => el.id == id)
    } else if (
      mode == 'preview' && 
      information?.automation?.isPublished
    ) {
      return information?.publishedAutomation?.nodes.find(el => el.id == id)
    }

  }, [information, mode])

  return {
    getNodeConfiguration
  }
}