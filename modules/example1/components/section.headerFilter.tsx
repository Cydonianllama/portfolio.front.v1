import { InputSearchTable } from "@/components/InputSearchTable"

export type SectionHeaderFilterProps = {
  OnSearch: (text: string) => void
}

export const SectionHeaderFilter = (data: SectionHeaderFilterProps) => {

  
  return (<>
    <div className="flex justify-between items-center pb-5">
      <div></div>
      <div>
        <InputSearchTable
          onSearch={data.OnSearch}
          placeholder="Buscar"
          timeout={600}
        />
      </div>
    </div>
  </>)
}