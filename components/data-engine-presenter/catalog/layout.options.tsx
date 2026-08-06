import type { ReactElement } from "react"
import { type PresenterConfigurationModes } from '../types/index'
import { CiViewTable } from "react-icons/ci"
import { IoList } from "react-icons/io5"
import { LuColumns3 } from "react-icons/lu"

export type LayoutOptionType = {
  code: PresenterConfigurationModes
  title: string
  icon: ReactElement
}

export const CatalogOptions: Array<LayoutOptionType> = [
  { 
    code: 'table',
    title: 'Tabla',
    icon: <><CiViewTable /></>
  },
  { 
    code: 'board',
    title: 'Board',
    icon: <><LuColumns3 /></>
  },
  { 
    code: 'list',
    title: 'Lista',
    icon: <><IoList /></>
  }
]