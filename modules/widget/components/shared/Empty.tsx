/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from '@/components/ui/button'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

type EmptyProps = {
  title: string;
  description: string;
  isActiveCreate: boolean;
  onClickCreate?: () => void;
}

export const EmptyStateWidgetComponent = ({
  description,
  title,
  isActiveCreate,
  onClickCreate,
}: EmptyProps) => {
  return (<>
    <Empty className="border rounded bg-gray-50">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IoChatbubbleEllipsesOutline />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>
          {description}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        {isActiveCreate && (<>
          <Button onClick={onClickCreate}>Crear item</Button>
        </>)}
      </EmptyContent>
    </Empty>
  </>)
}
