import type { LayoutOptionType } from "../../catalog/layout.options"
import type { PresenterConfigurationModes } from "../../index";

/* eslint-disable @typescript-eslint/no-empty-object-type */
type LayouSelectorItemProps = {
  data: LayoutOptionType
  mode: PresenterConfigurationModes
  handleClickItem: (data: LayoutOptionType) => void
}

// eslint-disable-next-line no-empty-pattern
export function LayouSelectorItem({ data, mode, handleClickItem }: LayouSelectorItemProps) {

  const HandlClickItem = () => {
    handleClickItem(data)
  }

  return (<>
    <div onClick={HandlClickItem} className={`border rounded flex justify-center items-center h-15 cursor-pointer select-none  ${mode == data.code ? 'border-blue-400 text-blue-500' : 'text-gray-400'}`}>
      <div className="flex flex-col items-center gap-1">
        <div>{data.icon}</div>
        <div className="text-xs">{data.title}</div>
      </div>
    </div>
  </>)
}