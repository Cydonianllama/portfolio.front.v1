/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"
import { MdErrorOutline } from "react-icons/md";

type SpinnerListingProps = {
  title?: string;
  description?: string
  onClickRetry?: () => void
}

export function ErrorStateComponent({ title, description, onClickRetry } : SpinnerListingProps) {

  const onClickRetry_ = () => {
    if (onClickRetry) onClickRetry()
  }

  return (
    <Empty className="border rounded bg-gray-50 w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-red-50">
          <MdErrorOutline className="text-red-500" />
        </EmptyMedia>
        <EmptyTitle>{title ? title : 'Error listando'} </EmptyTitle>
        <EmptyDescription>
          {description ? description : 'Ha ocurrido un error listando los items.'}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={onClickRetry_} variant="outline" size="sm">
          Reintentar
        </Button>
      </EmptyContent>
    </Empty>
  )
}