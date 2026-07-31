import { UseAppData } from "@/hooks/app/useAppData";
import { groupWordsItemSendMessageConfigNode } from "@erick/conversationalflow";

import {
  Handle,
  Position,
} from "@xyflow/react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type GroupWordsItemProps = {
  data: groupWordsItemSendMessageConfigNode
  index: number
}

export const GroupWordsItem = ({ data, index }: GroupWordsItemProps) => {
  const useAppData = UseAppData()

  return (
    <>
      <div className="flex gap-1 relative">
        {data?.words?.map((el, index) => <div className="text-xs p-1 border rounded inline-flex" key={index}>{el.text}</div>)}
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