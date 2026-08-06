import { useDataEngine } from "../../hooks/useDataEngine"
import { BoardView } from "./Board/BoardView"
import type { DefaultViewProps } from "./DefaultViewProps.type"
import { ListView } from "./List/ListView"
import { TableView } from "./Table/TableView"


export const ViewManager = ({ onAddRecord }: DefaultViewProps) => {
  const { currentView } = useDataEngine()

  console.log(onAddRecord)

  return (<>
    {currentView?.configuration?.mode == 'table' && (
      <TableView
        onAddRecord={onAddRecord}
      />
    )}
    {currentView?.configuration?.mode == 'list' && (
      <ListView
        onAddRecord={onAddRecord}
      />
    )}
    {currentView?.configuration?.mode == 'board' && (
      <BoardView
        onAddRecord={onAddRecord}
      />
    )}
  </>)
}