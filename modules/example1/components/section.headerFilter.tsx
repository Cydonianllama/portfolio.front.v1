// componets
import { InputSearchTable } from "@/components/InputSearchTable"
import { Button } from "@/components/ui/button"

// icons
import { IoFilterSharp } from "react-icons/io5";
import { ImSortAmountDesc } from "react-icons/im";

export type SectionHeaderFilterProps = {
  OnSearch: (text: string) => void
  itemsSelected?: Array<string>
}

export const SectionHeaderFilter = (data: SectionHeaderFilterProps) => {

  
  return (<>
    <div className="flex justify-between items-center pb-5">
      <div className="flex gap-2 items-center">
        <Button variant={'outline'}>
          <IoFilterSharp/>
          Filtros
        </Button>
        {((data?.itemsSelected?.length || 0) > 0) && (<>
          <span>{data?.itemsSelected?.length}</span> elementos seleccionados.
        </>)}
      </div>
      <div className="flex gap-2 items-center">
        <InputSearchTable
          onSearch={data.OnSearch}
          placeholder="Buscar"
          timeout={600}
        />
        <Button variant={'outline'}>
          <ImSortAmountDesc/>
          Ordenar
        </Button>
      </div>
    </div>
  </>)
}