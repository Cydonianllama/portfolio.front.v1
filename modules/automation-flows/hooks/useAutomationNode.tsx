import { useCallback } from "react"
import { automationFlowGenStore } from "../store/automation.flow.store"
import { IAutomationNode } from "@erick/conversationalflow"

/**
 * Resuelve el nodo actual de la automatización.
 * - Si recibe `id`, busca ese nodo (uso en nodos del canvas).
 * - Si no, usa `currentNodeIdEditing` (uso en editores).
 * - Respeta mode (editor/preview) e isPublished para elegir la fuente correcta.
 */
export const useAutomationNode = (id?: string) => {
  const information = automationFlowGenStore(state => state.information)
  const mode = automationFlowGenStore(state => state.mode)
  const currentNodeIdEditing = automationFlowGenStore(state => state.currentNodeIdEditing)

  const nodeId = id ?? currentNodeIdEditing ?? ''

  const getNodeConfiguration = useCallback((): IAutomationNode | null | undefined => {
    if (!nodeId) return undefined

    if (
      mode == 'editor' ||
      (mode == 'preview' && !information?.automation?.isPublished)
    ) {
      return information?.nodeList?.find(el => el.id == nodeId)
    }

    if (mode == 'preview' && information?.automation?.isPublished) {
      return information?.publishedAutomation?.nodes.find(el => el.id == nodeId)
    }

    return undefined
  }, [information, mode, nodeId])

  return {
    getNodeConfiguration,
    currentNodeIdEditing
  }
}
