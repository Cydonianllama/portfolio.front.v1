import { useEffect } from "react"
import { StaticModulesApp } from "../app/useAppInitiallizer"
import { useAppStore } from "@/modules/app/stores/appStore"

type UserBreadCrumbProps = {
  module: StaticModulesApp
}

export const UserBreadCrumb = ({ module } : UserBreadCrumbProps) => { 

  const appStore = useAppStore()

  useEffect(() => {
    if (module == 'chat'){
      appStore.setBreadcrum([{ text: 'chat', route: null }])
    } else if (module == 'contacts') {
      appStore.setBreadcrum([{ text: 'contactos', route: null }])
    } else if (module == 'home') {
      appStore.setBreadcrum([{ text: 'inicio', route: null }])
    }
  }, [module])
}