import { useAppStore } from "@/modules/app/stores/appStore"
import { useEffect } from "react"

export const useAutomationFlowchartBreadcrumb = () => {
  const setBreadcrum = useAppStore((state) => state.setBreadcrum)

  useEffect(() => {
    setBreadcrum([{ text: 'Automatizaciones', route: null }, { text: 'Editor', route: null }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
