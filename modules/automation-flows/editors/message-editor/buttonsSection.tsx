import { IconsCatalog } from "@/catalogs/icons.catalogs";
import { Button } from "@/components/ui/button";
import { UseAppData } from "@/hooks/app/useAppData";
import { ButtonItem } from "./buttonItem";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ButtonsSectionProps = {

}

export const ButtonsSection = ({ }: ButtonsSectionProps) => {
  const useAppData = UseAppData()

  return (
    <>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-foreground font-semibold">Botones</div>
          <div>
            <Button variant={'outline'} size={'icon-sm'}>
              {IconsCatalog.addPlus.Icon}
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <ButtonItem />
          <ButtonItem />
          <ButtonItem />
          <ButtonItem />
        </div>
      </div>
    </>
  )
}