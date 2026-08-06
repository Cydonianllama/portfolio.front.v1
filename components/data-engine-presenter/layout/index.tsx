/* eslint-disable @typescript-eslint/no-unused-vars */
import { Filter, Group, More, Search, Sort, TableBodyD, TableCellD, TableD, TableHeaderD, TableRowD, View } from "..";

export function Layout() {
  return (<>
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between h-10 px-4 items-center">
        <div>
          <View views={[]} />
        </div>
        <div className="gap-2 flex items-center">
          <Filter />
          <Sort />
          <Group />
          <Search />
          <More />
        </div>
      </div>
      <div className="flex-1 p-5">
        <TableD>
          <TableHeaderD>
            <TableRowD>
              <TableCellD>
                wa
              </TableCellD>
              <TableCellD>
                we
              </TableCellD>
              <TableCellD>
                wi
              </TableCellD>
              <TableCellD>
                wo
              </TableCellD>
            </TableRowD>
          </TableHeaderD>
          <TableBodyD>
            <TableRowD>
              <TableCellD>
                wa
              </TableCellD>
              <TableCellD>
                we
              </TableCellD>
              <TableCellD>
                wi
              </TableCellD>
              <TableCellD>
                wo
              </TableCellD>
            </TableRowD>
          </TableBodyD>
        </TableD>
      </div>
    </div>
  </>)
}