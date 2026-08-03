import { IAutomationNode, NODE_TYPE_NOTE } from "@erick/conversationalflow"
import { BaseEditor } from "./_base.editor"
import { Label } from "@/components/ui/label"
import { useAutomationEditor } from "../hooks/useAutomationEditor"
import { useActionEditorActions } from "../hooks/useActionEditorActions"
import { TextareaAutomation } from "../components/EditorUtilities/Texteditor"

/* eslint-disable @typescript-eslint/no-empty-object-type */
type NoteEditorProps = {

}

const noteColors: Array<{ value: string, label: string, classColor: string }> = [
  { value: 'yellow', label: 'Amarillo', classColor: 'bg-yellow-200' },
  { value: 'blue', label: 'Azul', classColor: 'bg-blue-200' },
  { value: 'green', label: 'Verde', classColor: 'bg-green-200' },
  { value: 'gray', label: 'Gris', classColor: 'bg-gray-200' },
  { value: 'red', label: 'Rojo', classColor: 'bg-red-200' },
  { value: 'purple', label: 'Púrpura', classColor: 'bg-purple-200' },
  { value: 'orange', label: 'Naranja', classColor: 'bg-orange-200' },
  { value: 'sky', label: 'Celeste', classColor: 'bg-sky-200' },
]

export const NoteEditor = ({ }: NoteEditorProps) => {
  const { GetAutomationNodeInformation } = useAutomationEditor()
  const { UpdateActionConfiguration } = useActionEditorActions()

  const nodeInformation = GetAutomationNodeInformation() as IAutomationNode<typeof NODE_TYPE_NOTE>;

  const content = nodeInformation?.configuration?.content || ''
  const color = nodeInformation?.configuration?.color || 'yellow'

  const HandleChangeColor = (nextColor: string) => {
    UpdateActionConfiguration('updateNote', nodeInformation, { content, color: nextColor })
  }

  const HandleChangeContent = (nextContent: string) => {
    UpdateActionConfiguration('updateNote', nodeInformation, { content: nextContent, color })
  }

  return (
    <BaseEditor>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label>Color</Label>
          <div className="flex flex-wrap gap-1.5">
            {noteColors.map((el) => (
              <button
                key={el.value}
                type="button"
                onClick={() => HandleChangeColor(el.value)}
                className={`h-8 w-8 rounded-full border-2 ${el.classColor} ${color == el.value ? 'border-foreground' : 'border-transparent'}`}
                title={el.label}
              />
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Contenido</Label>
          <TextareaAutomation value={content} onUpdate={HandleChangeContent} />
        </div>
      </div>
    </BaseEditor>
  )
}
