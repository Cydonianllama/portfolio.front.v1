/* eslint-disable @typescript-eslint/no-unused-vars */
import { dataEngineDataContext } from "../../../contexts/dataEngineDataContext"
import { useContext } from "react"
import { TableCellD } from "./TableCell"
import { TableRowD } from "./TableRow"
import { type RecordPresenter } from '../../../types/index'

export type RowItemRecordProps = {
  data: RecordPresenter
}

export function RowItemRecord({ data }: RowItemRecordProps) {

  const dataEngineData = useContext(dataEngineDataContext)



  return (<>
    <TableRowD>
      {dataEngineData.configuration.entityInformation.fields.map((el, index) => (
        <TableCellD key={index}>
          {Object.keys(data.values).find(col => col == el.id) ? data.values[el.id] : ''}
        </TableCellD>
      ))}
      {/* {Object.keys(data.values).map((k, i) => {
        // console.log(`itemlist`, itemList)
        // const val = (itemList as Record<string, any>)[k]
        return (<>
          <TableCellD key={i}>
            {data.values[k]}
          </TableCellD>
        </>)
      })} */}
    </TableRowD>

  </>)
}