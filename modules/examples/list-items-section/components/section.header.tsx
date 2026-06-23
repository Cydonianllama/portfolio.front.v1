// components
import { Button } from "@/components/ui/button"
import { InputSearchTable } from "@/components/InputSearchTable";

type HeaderProps = {
  onClickAdd?: () => void;
  onSearh?: (text: string) => void;
}

export const Header = ({ onSearh, onClickAdd }: HeaderProps) => {
  
  const OnSearch = (text: string) => {
    if (onSearh) onSearh(text)
  }

  const OnClickAdd = () => {
    if (onClickAdd) onClickAdd()
  }

  return (<>
    <section className="flex justify-between items-center">
      <InputSearchTable
        onSearch={OnSearch}
        placeholder="Buscar..."
        timeout={600}
      />

      <div>
        <Button onClick={OnClickAdd} variant="default">Agregar</Button>
      </div>
    </section>
  </>)
}