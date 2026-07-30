import { ReactElement } from "react"
import { FaRegTrashAlt } from "react-icons/fa"
import { GoPlus } from "react-icons/go"
import { IoClose } from "react-icons/io5"

type availableIcons = 'addPlus' | 'removex' | 'trash'

export const IconsCatalog: Record<availableIcons, { Icon: ReactElement }> = {
  addPlus: {
    Icon: <GoPlus />
  },
  removex: {
    Icon: <IoClose />
  },
  trash: {
    Icon: <FaRegTrashAlt />
  }
}