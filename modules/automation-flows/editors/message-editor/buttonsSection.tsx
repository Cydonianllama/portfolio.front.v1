import { IconsCatalog } from "@/catalogs/icons.catalogs";
import { Button } from "@/components/ui/button";
import { UseAppData } from "@/hooks/app/useAppData";
import { ButtonItem } from "./buttonItem";
import { IAutomationNode, NODE_TYPE_GENERAL_MESSAGE_SIMPLE } from "@erick/conversationalflow";
import { useAutomationEditor } from "../../hooks/useAutomationEditor";
import { useMessageEditorActions } from "../../hooks/useMessageEditorActions";
import { EmptyState } from "../../components/states/EmptyState";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ButtonsSectionProps = {

}

export const ButtonsSection = ({ }: ButtonsSectionProps) => {
  const useAppData = UseAppData()

  const { GetAutomationNodeInformation } = useAutomationEditor()
  const { UpdateMessageConfiguration } = useMessageEditorActions()
  const nodeInformation = GetAutomationNodeInformation() as IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>;

  const HandleAddButton = () => {
    UpdateMessageConfiguration('addButton', nodeInformation, {
      data: {
        id: `button-${Math.ceil(Math.random() * 100000)}`,
        nextNode: null,
        text: ''
      }
    })
  }

  return (
    <>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-foreground font-semibold">Botones</div>
          <div>
            <Button onClick={HandleAddButton} variant={'outline'} size={'icon-sm'}>
              {IconsCatalog.addPlus.Icon}
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {nodeInformation?.configuration?.buttons?.length ? (
            nodeInformation?.configuration?.buttons?.map((el, index) => <ButtonItem index={index} data={el} key={index} />)
          ) : (
            <EmptyState
              Icon={IconsCatalog.addPlus.Icon}
              title="Sin botones"
              description="Agrega un botón para ofrecer opciones rápidas al usuario."
            />
          )}
        </div>
      </div>
    </>
  )
}