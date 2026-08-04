import { groupWordsItemSendMessageConfigNode } from "@erick/conversationalflow";

import {
  Handle,
  Position,
} from "@xyflow/react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type GroupWordsItemProps = {
  data: groupWordsItemSendMessageConfigNode
}

export const GroupWordsItem = ({ data }: GroupWordsItemProps) => {
  const connected = Boolean(data?.nextNode)

  return (
    <>
      <div className={`flex gap-1 relative items-center ${connected ? 'rounded border border-green-400 bg-green-50/50 p-1' : ''}`}>
        {/* <span
          className={`h-2 w-2 rounded-full shrink-0 ${connected ? 'bg-green-500' : 'bg-amber-400'}`}
          title={connected ? 'Conectado' : 'Sin conexión'}
        /> */}
        <div className="flex flex-wrap gap-1">
          {data?.words?.map((el, index) => <div className="text-xs p-1 border rounded-lg inline-flex" key={index}>{el.text}</div>)}
        </div>
        <Handle
          id={data?.id}
          type="source"
          position={Position.Right}
          style={{
            width: 12,
            height: 12,
            background: "#2563eb",
            border: "2px solid white",
            borderRadius: "50%",
          }}
        />
      </div>
    </>
  )
}