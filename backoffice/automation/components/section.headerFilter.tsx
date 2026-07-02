// componets
import { InputSearchTable } from "@/components/InputSearchTable"
import { Button } from "@/components/ui/button"
import { filterOptions } from "../types/options.filter";
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
      </div>
      <div className="flex gap-2 items-center">
        {((data?.itemsSelected?.length || 0) > 0) && (<>
          <span>{data?.itemsSelected?.length}</span> elementos seleccionados.
        </>)}

      </div>
    </div>
  </>)
}