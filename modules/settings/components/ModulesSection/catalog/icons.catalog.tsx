import { ReactElement } from "react"
import { BsBoxes } from "react-icons/bs"
import { FiBox, FiUsers } from "react-icons/fi"
import { GrStorage } from "react-icons/gr"
import { LuBlocks } from "react-icons/lu"
import { MdOutlineStorefront } from "react-icons/md"
import { VscFileSubmodule } from "react-icons/vsc"

/* eslint-disable @typescript-eslint/no-empty-object-type */
type IconEntityItem = {
  Icon: ReactElement,
  code: string,
} 

export const icons: Array<IconEntityItem> = [
  {
    Icon: <VscFileSubmodule />,
    code: 'v1-module'
  },
  {
    Icon: <LuBlocks />,
    code: 'v1-blocks'
  },
  {
    Icon: <FiUsers />,
    code: 'v1-users'
  },
  {
    Icon: <GrStorage />,
    code: 'v1-storage'
  },
  {
    Icon: <MdOutlineStorefront />,
    code: 'v1-store'
  },
  {
    Icon: <FiBox />,
    code: 'v1-box'
  },
  {
    Icon: <BsBoxes />,
    code: 'v1-boxes'
  }
]