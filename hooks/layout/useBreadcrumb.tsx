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
      appStore.setTest('chatero')
    } else if (module == 'contacts') {
      appStore.setTest('contactero')
    }
  }, [module])
}