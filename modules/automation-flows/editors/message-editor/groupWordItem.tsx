import { IconsCatalog } from "@/catalogs/icons.catalogs";
import { Button } from "@/components/ui/button";
import { UseAppData } from "@/hooks/app/useAppData";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type GroupWordItemProps = {

}

export const GroupWordItem = ({ }: GroupWordItemProps) => {
  const useAppData = UseAppData()

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-xs flex gap-1">

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground border p-0.5 rounded-md">
            <div className="flex items-center">
              uno
            </div>
            <button>
              {IconsCatalog.removex.Icon}
            </button>
          </div>
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