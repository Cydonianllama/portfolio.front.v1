import { PropsWithChildren } from 'react'
import { UseAppData } from "@/hooks/app/useAppData";
import { TfiClose } from "react-icons/tfi";
import { Button } from '@/components/ui/button';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type BaseEditorProps = {
  
}

export const BaseEditor = ({ children }: PropsWithChildren<BaseEditorProps>) => {
  const useAppData = UseAppData()

  return (
    <div className='h-full overflow-auto'>
      <div className='flex justify-between items-center px-2 pt-2'>
        <div>
          Editor Base
        </div>
        <Button variant={'outline'} size={'icon'}>
          <TfiClose/>
        </Button>
      </div>
      {children}
    </div>
  )
}