import { IconsCatalog } from "@/catalogs/icons.catalogs";
import { Button } from "@/components/ui/button";
import { ButtonItem } from "./buttonItem";
import { IAutomationNode, NODE_TYPE_GENERAL_MESSAGE_SIMPLE } from "@erick/conversationalflow";
import { useMessageEditorActions } from "../../hooks/useMessageEditorActions";
import { EmptyState } from "../../components/states/EmptyState";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ButtonsSectionProps = {
  node: IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>
}

export const ButtonsSection = ({ node }: ButtonsSectionProps) => {
  const { UpdateMessageConfiguration } = useMessageEditorActions()

  const HandleAddButton = () => {
    UpdateMessageConfiguration('addButton', node, {
      data: {
        id: `button-${Math.ceil(Math.random() * 100000)}`,
        nextNode: null,
        text: ''
      }
    })
  }

  const buttons = node.configuration?.buttons || []

  const duplicatedTexts = buttons
    .map((button) => button.text)
    .filter((text, index, arr) => text && arr.indexOf(text) !== index)

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
        {duplicatedTexts.length > 0 && (
          <p className="text-xs text-amber-600">
            Hay botones con el mismo texto: {[...new Set(duplicatedTexts)].join(', ')}
          </p>
        )}
        <div className="flex flex-col gap-2">
          {buttons.length ? (
            buttons.map((el, index) => <ButtonItem index={index} data={el} node={node} key={el.id || index} />)
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
