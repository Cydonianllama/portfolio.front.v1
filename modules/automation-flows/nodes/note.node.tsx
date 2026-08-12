import { isNoteNode } from "../utils/node.guards";
import { AutomationNodeComponentProps } from "../registry/types";

const noteColorClass: Record<string, string> = {
  yellow: 'bg-yellow-50 border-yellow-300',
  blue: 'bg-blue-50 border-blue-300',
  green: 'bg-green-50 border-green-300',
  gray: 'bg-gray-50 border-gray-300',
  red: 'bg-red-50 border-red-300',
  purple: 'bg-purple-50 border-purple-300',
  orange: 'bg-orange-50 border-orange-300',
  sky: 'bg-sky-50 border-sky-300',
}

export function NoteNode({ getNodeConfiguration }: AutomationNodeComponentProps) {
  const nodeInformation = getNodeConfiguration()

  const isNode = isNoteNode(nodeInformation)
  const content = isNode ? nodeInformation.configuration?.content || '' : ''
  const color = isNode ? nodeInformation.configuration?.color || 'yellow' : 'yellow'

  return (
    <>
      <div className={`max-w-[200px] w-[200px] pt-2 rounded-lg border px-2 py-1.5 ${noteColorClass[color] || noteColorClass.yellow}`}>
        {content ? (
          <p className="text-[10px] whitespace-pre-wrap max-h-24 overflow-y-auto">{content}</p>
        ) : (
          <p className="text-[10px] text-muted-foreground">Nota vacía</p>
        )}
      </div>
    </>
  );
}
