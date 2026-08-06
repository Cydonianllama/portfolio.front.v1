/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { DefaultViewProps } from "../DefaultViewProps.type"
import { TableD } from "./Table"
import { useContext } from "react"
import { dataEngineDataContext } from "../../../contexts/dataEngineDataContext"
import { RowAddRecord } from "./RowAddRecord"
import { RowItemRecord } from "./RowItem"
import { TableHeaderD } from "./TableHeader"
import { TableCellD } from "./TableCell"
import { TableRowD } from "./TableRow"
import { TableBodyD } from "./TableBody"


export function TableView({ onAddRecord }: DefaultViewProps) {

  const dataEngineData = useContext(dataEngineDataContext)

  return (<>
    <TableD>
      <TableHeaderD>
        <TableRowD>
          {dataEngineData.configuration.entityInformation.fields.map((el, index) => (
            <TableCellD key={index}>
              {el.name}
            </TableCellD>
          ))}
        </TableRowD>
      </TableHeaderD>
      <TableBodyD>
        {dataEngineData.configuration.records.list.map((itemList, index) => (
          <RowItemRecord key={index} data={itemList} />
        ))}
        <RowAddRecord
          handleAdd={(data) => {
            if (onAddRecord) {
              onAddRecord(data)
            }
          }}
        />
      </TableBodyD>
    </TableD>
  </>)
}