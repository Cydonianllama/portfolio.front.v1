import { useEffect } from "react"
import { useAppStore } from "@/modules/app/stores/appStore"

export const useChatBreadcrumb = () => {
  const setBreadcrum = useAppStore((state) => state.setBreadcrum)

  useEffect(() => {
    setBreadcrum([{ text: 'chat', route: null }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
