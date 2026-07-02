// componets
import { InputSearchTable } from "@/components/InputSearchTable"
import { Button } from "@/components/ui/button"
import { Filter } from "./filter";
import { filterOptions } from "../types/options.filter";
import { Sort } from "./sort";
import { sortOptions } from "../types/options.sort";

export type SectionHeaderFilterProps = {
  OnSearch: (text: string) => void
  itemsSelected?: Array<string>
}



export const SectionHeaderFilter = (data: SectionHeaderFilterProps) => {

  //
  // Filter
  //


  //
  // Sort
  //


  return (<>
    <div className="flex justify-between items-center pb-5">
      <div className="flex gap-2 items-center">
        <InputSearchTable
          onSearch={data.OnSearch}
          placeholder="Buscar"
          timeout={600}
        />
        <Filter
          options={filterOptions.map(el => ({ id: el.code, label: el.title, values: [{ id: 'test2', label:'test2'}, { id: 'test3', label:'test3'}] }))}
        />
        <Sort
          options={sortOptions.map(el => ({id: el.code, label: el.title}))}
        />
      </div>
      <div className="flex gap-2 items-center">
        {((data?.itemsSelected?.length || 0) > 0) && (<>
          <span>{data?.itemsSelected?.length}</span> elementos seleccionados.
        </>)}

      </div>
    </div>
  </>)
}