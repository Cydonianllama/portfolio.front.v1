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

type SpinnerListingProps = {
  title?: string;
  description?: string
}

export function SpinnerListing({ title, description } : SpinnerListingProps) {
  return (
    <Empty className="border rounded bg-gray-50 w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>{title ? title : 'Processing your request'} </EmptyTitle>
        <EmptyDescription>
          {description ? description : 'Please wait while we process your request. Do not refresh the page.'}
        </EmptyDescription>
      </EmptyHeader>
      {/* <EmptyContent>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
      </EmptyContent> */}
    </Empty>
  )
}