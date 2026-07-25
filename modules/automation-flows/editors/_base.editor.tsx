import { PropsWithChildren } from 'react'
import { UseAppData } from "@/hooks/app/useAppData";
import { TfiClose } from "react-icons/tfi";
import { Button } from '@/components/ui/button';
import { useAutomationFlow } from '../store/automation.flow.store';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type BaseEditorProps = {
  
}

export const BaseEditor = ({ children }: PropsWithChildren<BaseEditorProps>) => {
  const useAppData = UseAppData()

  const automationFlowStore = useAutomationFlow()

  const currentNode = automationFlowStore.information?.nodeList?.find(el => el.id == automationFlowStore.currentNodeIdEditing)

  const OnClickClose = () => {
    automationFlowStore.clearEdit()
  }

  return (
    <div className='h-full overflow-auto'>
      <div className='flex justify-between items-center px-2 py-3 border-b'>
        <div className='font-semibold'>
          {currentNode?.title}
        </div>
        <Button onClick={OnClickClose} variant={'outline'} size={'icon'}>
          <TfiClose/>
        </Button>
      </div>
      {children}
    </div>
  )
}