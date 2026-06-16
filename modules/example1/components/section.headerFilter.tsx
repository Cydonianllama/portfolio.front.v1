import { InputSearchTable } from "@/components/InputSearchTable"

export const SectionHeaderFilter = () => {

  const OnSearch = async (text: string) => {

  }


  return (<>
    <div className="flex justify-between items-center pb-5">
      <div></div>
      <div>
        <InputSearchTable
          onSearch={OnSearch}
          placeholder="Buscar"
          timeout={600}
        />
      </div>
    </div>
  </>)
}