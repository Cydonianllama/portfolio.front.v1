import { IconsCatalog } from "@/catalogs/icons.catalogs";
import { Button } from "@/components/ui/button";
import { UseAppData } from "@/hooks/app/useAppData";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ButtonItemProps = {
  
}

export const ButtonItem = ({  }: ButtonItemProps) => {
  const useAppData = UseAppData()

  return (
    <>
      <div className="flex justify-between items-center gap-1.5">
        <div className=" flex-1 border rounded text-center text-foreground">
          Button name
        </div>
        <div className="flex gap-1 items-center">
          <Button variant={'outline'} size={'icon-xs'}>
            {IconsCatalog.addPlus.Icon}
          </Button>
          <Button variant={'outline'} size={'icon-xs'}>
            {IconsCatalog.removex.Icon}
          </Button>
        </div>
      </div>
    </>
  )
}