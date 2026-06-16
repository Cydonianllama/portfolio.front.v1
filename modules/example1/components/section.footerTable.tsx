// components
import { Button } from '@/components/ui/button'

// icons
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const SectionFooterTable = () => {
  const HandleToNextPage = () => {

  }

  const HandleToPrevPage = () => {

  }

  return (<>
    <div className='flex justify-between items-center py-4'>
      <div>1-20 de 250</div>
      <div className='flex gap-2 items-center'>
        <Button
          size={'icon'}
          variant="outline"
          onClick={HandleToNextPage}
        >
          <FaChevronLeft />
        </Button>
        <span>1/9</span>
        <Button
          onClick={HandleToPrevPage}
          size={'icon'}
          variant="outline"
        >
          <FaChevronRight />
        </Button>
      </div>
    </div>
  </>)
}