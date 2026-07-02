// components
import { Button } from "@/components/ui/button"
import { InputSearchTable } from "@/components/InputSearchTable";
import { IoMdRefresh } from "react-icons/io";

type HeaderProps = {
  onClickAdd?: () => void;
  onClickRefresh?: () => void;
  onSearh?: (text: string) => void;
}

export const Header = ({ onSearh, onClickAdd, onClickRefresh }: HeaderProps) => {
  
  const OnSearch = (text: string) => {
    if (onSearh) onSearh(text)
  }

  const OnClickAdd = () => {
    if (onClickAdd) onClickAdd()
  }

  const OnClickRefresh = () => {
    if (onClickRefresh) onClickRefresh()
  }

  return (<>
    <section className="flex justify-between items-center">
      <InputSearchTable
        onSearch={OnSearch}
        placeholder="Buscar..."
        timeout={600}
      />

      <div className="flex items-center gap-2">
        <Button onClick={OnClickRefresh} variant="outline" size={'icon'}><IoMdRefresh/></Button>
        <Button onClick={OnClickAdd} variant="default" >Agregar</Button>
      </div>
    </section>
  </>)
}