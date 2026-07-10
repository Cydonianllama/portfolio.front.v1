import { useWorkspaceSelectionStore } from "@/modules/app/stores/workspaceStore"
import { useEffect } from "react"
import { UseScreenChatAction } from "../chat/useScreenChatActions"
import { UserBreadCrumb } from "../layout/useBreadcrumb"

export type StaticModulesApp = 'chat' | 'contacts' | 'home'

type UseAppInitializerPops = {
  moduleName: StaticModulesApp
}

export const UseAppInitializer = ({ moduleName } : UseAppInitializerPops) => {

  UserBreadCrumb({ module: moduleName })

  const workspaceSelector = useWorkspaceSelectionStore()
  
  const ScreenChatActions = UseScreenChatAction()

  // cuando cambia un workspace
  useEffect(() => {
    if (workspaceSelector.selectedWorkspaceId){
      if (moduleName == 'chat'){
        ScreenChatActions.OnInit()
      }
    }
  }, [workspaceSelector.selectedWorkspaceId, moduleName])

  return {

  }
}