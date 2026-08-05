import { useWorkspaceSelectionStore } from "@/modules/app/stores/workspaceStore"
import { useEffect } from "react"
import { UseScreenChatAction } from "../../modules/chat/actions/useScreenChatActions"
import { useSocket } from "../useSocket"
import { useBreadCrumb } from "@/layouts/appLayout/hooks/useBreadcrumb"

export type StaticModulesApp = 'chat' | 'contacts' | 'home'

type UseAppInitializerPops = {
  moduleName: StaticModulesApp
}

//
// Una sola instancia en cada pagina
//

export const UseAppInitializer = ({ moduleName } : UseAppInitializerPops) => {

  useBreadCrumb({ module: moduleName })

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