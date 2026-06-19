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

export const SectionFooterTable = ({ HandleToNextPage, HandleToPrevPage, pagination }: SectionFooterTableProps) => {
  return (<>
    <div className='flex justify-between items-center py-4'>
      <div>{((pagination?.page || 0) - 1) * (pagination?.limit || 0)}-{((pagination?.page || 0) - 1) * (pagination?.limit || 0) + (pagination?.limit || 0)} de <strong>{pagination?.total || 0}</strong></div>
      <div className='flex gap-5 items-center'>
        <Button
          size={'icon'}
          variant="outline"
          onClick={HandleToPrevPage}
          disabled={pagination?.hasPreviousPage ? false : true}
        >
          <FaChevronLeft />
        </Button>
        <span>{pagination?.page}/{pagination?.totalPages}</span>
        <Button
          onClick={HandleToNextPage}
          size={'icon'}
          variant="outline"
          disabled={pagination?.hasNextPage ? false : true}
        >
          <FaChevronRight />
        </Button>
      </div>
    </div>
  </>)
}