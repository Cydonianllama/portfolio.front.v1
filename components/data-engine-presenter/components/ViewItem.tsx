import { useContext } from "react";
import type { ViewPresenterItem } from ".."
import { dataEngineUIContext } from "../contexts/dataEngineUIContext";

type ViewItemProps = {
  data: ViewPresenterItem
  onPressed: (data: ViewPresenterItem) => void;
}

export function ViewItem(data: ViewItemProps) {
  
  const dataEngineUI = useContext(dataEngineUIContext)

  const HandlePress = () => {
    dataEngineUI?.setViewOpened(data?.data?.id || '')
    data.onPressed(data.data)
  }

  return (<>
    <div
      className={`border rounded-lg  text-sm px-2 py-1 select-none cursor-pointer   ${dataEngineUI.viewOpenedId == data.data.id ? 'border-blue-200 bg-blue-100 text-blue-600' : 'text-foreground hover:bg-gray-50'}`}
      onClick={HandlePress}
    >
      {data.data.name}
    </div>
  </>)
}