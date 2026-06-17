// components
import { Button } from '@/components/ui/button'
import { ResponsePagination } from '@/types/utils.pagination';

// icons
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export type SectionFooterTableProps = {
  HandleToNextPage: () => void;
  HandleToPrevPage: () => void;
  pagination: ResponsePagination | null;
}

export const SectionFooterTable = (data: SectionFooterTableProps) => {
  return (<>
    <div className='flex justify-between items-center py-4'>
      <div>1-20 de 250</div>
      <div className='flex gap-2 items-center'>
        <Button
          size={'icon'}
          variant="outline"
          onClick={data.HandleToNextPage}
        >
          <FaChevronLeft />
        </Button>
        <span>1/9</span>
        <Button
          onClick={data.HandleToPrevPage}
          size={'icon'}
          variant="outline"
        >
          <FaChevronRight />
        </Button>
      </div>
    </div>
  </>)
}