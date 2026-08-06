/* eslint-disable no-empty-pattern */
import { Button } from "../../../../../components/ui/button";
import { TableCellD } from "./TableCell";
import { TableRowD } from "./TableRow";
import type { RecordPresenter } from "../../../index";

type RowAddRecordProps = {
  handleAdd: (data: RecordPresenter) => void
}

export function RowAddRecord({ handleAdd } : RowAddRecordProps){

  const HandleAdd = () => {
    handleAdd({
      id: `id-${Math.ceil(Math.random() * 10000000)}`,
      values: [
        
      ]
    })
  }

  return(<>
    <TableRowD>
      <TableCellD>
        <Button onClick={HandleAdd} variant={'outline'} size={'xs'}>
          Agregar Record
        </Button>
      </TableCellD>
    </TableRowD>
  </>)
}