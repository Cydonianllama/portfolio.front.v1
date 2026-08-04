import { useCallback } from "react"
import { useAutomationNode } from "./useAutomationNode"

export const useAutomationEditor = () => {
  const { getNodeConfiguration } = useAutomationNode()

  const GetAutomationNodeInformation = useCallback(() => {
    return getNodeConfiguration()
  }, [getNodeConfiguration])

  return {
    GetAutomationNodeInformation,
  }
}
