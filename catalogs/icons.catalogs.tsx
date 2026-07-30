import { ReactElement } from "react"
import { FaRegTrashAlt } from "react-icons/fa"
import { GoPlus } from "react-icons/go"
import { IoClose } from "react-icons/io5"
import { MdSaveAlt } from "react-icons/md"
import { TiEdit } from "react-icons/ti"

type availableIcons = 'addPlus' | 'removex' | 'trash' | 'edit' | 'save'

export const IconsCatalog: Record<availableIcons, { Icon: ReactElement }> = {
  addPlus: {
    Icon: <GoPlus />
  },
  removex: {
    Icon: <IoClose />
  },
  trash: {
    Icon: <FaRegTrashAlt />
  },
  edit: {
    Icon: <TiEdit />
  },
  save: {
    Icon: <MdSaveAlt />
  }
}