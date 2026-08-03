import { IAutomationNode, NODE_TYPE_REMOVETAG } from "@erick/conversationalflow"
import { BaseEditor } from "./_base.editor"
import { Label } from "@/components/ui/label"
import { useAutomationEditor } from "../hooks/useAutomationEditor"
import { useActionEditorActions } from "../hooks/useActionEditorActions"
import { useTagsList } from "../hooks/useTagsList"
import { MultiSelect } from "../components/MultiSelect"

/* eslint-disable @typescript-eslint/no-empty-object-type */
type RemoveTagEditorProps = {

}

export const RemoveTagEditor = ({ }: RemoveTagEditorProps) => {
  const { GetAutomationNodeInformation } = useAutomationEditor()
  const { UpdateActionConfiguration } = useActionEditorActions()
  const { tags } = useTagsList()

  const nodeInformation = GetAutomationNodeInformation() as IAutomationNode<typeof NODE_TYPE_REMOVETAG>;

  const selectedIds = nodeInformation?.configuration?.toRemove?.map(el => el.tagId) || []

  const HandleChange = (tagIds: Array<string>) => {
    UpdateActionConfiguration('updateRemoveTags', nodeInformation, { tagIds })
  }

  return (
    <BaseEditor>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label>Etiquetas a remover</Label>
          <MultiSelect
            options={tags}
            selected={selectedIds}
            onChange={HandleChange}
            placeholder="Selecciona etiquetas..."
          />
          <p className="text-xs text-muted-foreground">El contacto perderá estas etiquetas al ejecutarse el nodo.</p>
        </div>
      </div>
    </BaseEditor>
  )
}
