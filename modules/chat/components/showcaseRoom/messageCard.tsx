import { PropsWithChildren } from 'react'



interface ChatMessageData {
  id: string;
  content: string;
  date: string
}

interface ChatMessageProp {
  type: 'me' | 'others'
  data?: ChatMessageData
}

export const ChatMessage = ({ data, type }: PropsWithChildren<ChatMessageProp>) => {


  if (type == 'me') return <>
    <div className="w-full flex justify-end px-2">
      <div className="w-1/2">
        <div className="flex flex-col items-end">
          <div className="flex items-end">
            <span className="text-xs p-2 bg-gray-100 rounded-lg">{data?.content}</span>
          </div>
          <div className="flex justify-end">
            <span className="text-xs text-gray-400">{data?.date}</span>
          </div>
        </div>
      </div>
    </div>
  </>

  if (type == 'others') return <>
    <div className="w-full flex justify-start px-2">
      <div className="w-1/2">
        <div className="flex flex-col">
          <div className="flex items-end">
            <span className="text-xs p-2 bg-gray-100 rounded-lg">{data?.content}</span>
          </div>
          <div className="flex justify-start">
            <span className="text-xs">{data?.date}</span>
          </div>
        </div>
      </div>
    </div>
  </>
}