import { useState } from "react"

export const useAsideChat = () => {
  const [openedAside, setOpenAside] = useState(true)
  const HandleToggleAsideListConversations = () => {
    setOpenAside(!openedAside)
  }

  return {
    openedAside,
    HandleToggleAsideListConversations
  }
}