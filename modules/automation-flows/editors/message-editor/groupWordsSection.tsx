import { IconsCatalog } from "@/catalogs/icons.catalogs";
import { Button } from "@/components/ui/button";
import { UseAppData } from "@/hooks/app/useAppData";
import { GroupWordItem } from "./groupWordItem";
import { useAutomationEditor } from "../../hooks/useAutomationEditor";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type GroupWordsSectionProps = {
  
}

export const GroupWordsSection = ({  }: GroupWordsSectionProps) => {
  const useAppData = UseAppData()

  const { GetAutomationNodeInformation } = useAutomationEditor('')

  return (
    <>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-foreground font-semibold">Palabras</div>
          <div>
            <Button variant={'outline'} size={'icon-sm'}>
              {IconsCatalog.addPlus.Icon}
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <GroupWordItem />
          <GroupWordItem />
          <GroupWordItem />
          <GroupWordItem />
        </div>
      </div>
    </>
  )
}