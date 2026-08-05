import { useState } from "react"

export const useShowAllActivities = () => {

  const [show, setShow] = useState(false)

  return {
    show,
    setShow
  }

}