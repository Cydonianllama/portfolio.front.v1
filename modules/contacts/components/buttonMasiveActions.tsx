import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

type ButtonMasiveActionsProps = {

}

export function ButtonMasiveActions({ }: ButtonMasiveActionsProps) {
  return (<>
    <Popover>
      <PopoverTrigger render={(
        <Button variant="outline">Acciones masivas</Button>
      )}>
      </PopoverTrigger>
      <PopoverContent className={'w-60'}>
        {/* <PopoverHeader>
          <PopoverTitle></PopoverTitle>
          <PopoverDescription></PopoverDescription>
        </PopoverHeader> */}
        <div>
          aquí listaremos las acciones masivas
        </div>
      </PopoverContent>
    </Popover>
  </>)
}