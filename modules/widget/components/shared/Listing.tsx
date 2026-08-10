/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { MdErrorOutline } from "react-icons/md";

type SpinnerListingProps = {
  title?: string;
  description?: string
}

export function ListingStateWidgetComponent({ title, description } : SpinnerListingProps) {
  return (
    <Empty className="border rounded bg-gray-50 w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>{title ? title : 'Procesando...'} </EmptyTitle>
        <EmptyDescription>
          {description ? description : 'Espere unos momentos mientras obtenemos los items.'}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

type ErrorStateProps = {
  title?: string;
  description?: string
  onClickRetry?: () => void
}

export function ErrorStateWidgetComponent({ title, description, onClickRetry } : ErrorStateProps) {
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
