/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "../../../../components/ui/button"
import { HiDotsVertical } from "react-icons/hi";
import { Layout } from "./layout";
import { useContext, useState } from "react";
import { dataEngineUIContext } from "../../contexts/dataEngineUIContext";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../../../../components/ui/popover"
import { CatalogOptions, type LayoutOptionType } from "../../catalog/layout.options";
import type { PresenterConfigurationModes } from "../../index";
import { LayouSelectorItem } from "./LayoutSelectorItem";
import { dataEngineDataContext } from "../../contexts/dataEngineDataContext";
import { useDataEngine } from "../../hooks/useDataEngine";

type MoreProps = {
  onModeChange?: (mode: PresenterConfigurationModes) => void;
}

export function More({ onModeChange }: MoreProps) {
  const { viewsIsEmpty } = useDataEngine();

  const dataEngineUI = useContext(dataEngineUIContext)
  const dataEngineData = useContext(dataEngineDataContext)

  const currentView = dataEngineData.configuration.views.find(el => el.id == dataEngineUI.viewOpenedId)

  const HandleClickItem = (data: LayoutOptionType) => {
    onModeChange?.(data.code)

    // actualizar el modo de la primera vista por el momento, despues cambiarlo por el modo del abierto
    console.log('actualizacion', dataEngineData.configuration.views)
    dataEngineData.setConfiguration({
      views: [
        ...dataEngineData.configuration.views.map((el, index) => {
          if (dataEngineUI.viewOpenedId == el.id){
            return {
              ...el,
              configuration: {
                mode: data.code
              }
            }
          } else return el
        })
      ]
    })
  }

  return (<>
    <Popover>
      <PopoverTrigger render={<Button variant={'outline'} size={'icon-sm'}>
        <HiDotsVertical />
      </Button>}>
      </PopoverTrigger>
      <PopoverContent className={'p-1'}>
        {dataEngineUI.currentMoreSectionOpened == 'main' && (<>
          <div onClick={() => { dataEngineUI.setMoreSectionOpened('layout') }} className="p-1 rounded hover:bg-gray-50 select-none cursor-pointer">Layout</div>
        </>)}
        {dataEngineUI.currentMoreSectionOpened == 'layout' && (<>
          <Layout>
            <div className="grid grid-cols-3 gap-1">
              {CatalogOptions.map((el, index) => (
                <LayouSelectorItem
                  key={index}
                  handleClickItem={HandleClickItem}
                  data={el}
                  mode={currentView?.configuration.mode || 'table'}
                />
              ))}
            </div>
          </Layout>
        </>)}
      </PopoverContent>
    </Popover>
  </>)
}