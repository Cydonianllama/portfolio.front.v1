import { BaseEditor } from "./_base.editor"
import { Label } from "@/components/ui/label"
import { useAutomationEditor } from "../hooks/useAutomationEditor"
import { useActionEditorActions } from "../hooks/useActionEditorActions"
import { useTagsList } from "../hooks/useTagsList"
import { MultiSelect } from "../components/MultiSelect"
import { isAddTagNode } from "../utils/node.guards"

/* eslint-disable @typescript-eslint/no-empty-object-type */
type AddTagEditorProps = {

}

export const AddTagEditor = ({ }: AddTagEditorProps) => {
  const { GetAutomationNodeInformation } = useAutomationEditor()
  const { UpdateActionConfiguration } = useActionEditorActions()
  const { tags } = useTagsList()

  const nodeInformation = GetAutomationNodeInformation()
  const isNode = isAddTagNode(nodeInformation)

  const selectedIds = isNode ? nodeInformation.configuration?.toAdd?.map(el => el.tagId) || [] : []

  const HandleChange = (tagIds: Array<string>) => {
    if (isNode) UpdateActionConfiguration('updateAddTags', nodeInformation, { tagIds })
  }

  return (
    <BaseEditor>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label>Etiquetas a agregar</Label>
          <MultiSelect
            options={tags}
            selected={selectedIds}
            onChange={HandleChange}
            placeholder="Selecciona etiquetas..."
          />
          <p className="text-xs text-muted-foreground">El contacto recibirá estas etiquetas al ejecutarse el nodo.</p>
        </div>
      </div>
    </BaseEditor>
  )
}
