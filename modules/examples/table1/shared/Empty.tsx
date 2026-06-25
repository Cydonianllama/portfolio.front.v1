/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ArrowUpRightIcon } from "lucide-react"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from '@/components/ui/button'
import { ReactElement } from "react";

type EmptyProps = {
  title: string;
  description: string;

  // create
  isActiveCreate: boolean;
  onClickCreate?: () => void;
  textButtonCreate?: ReactElement | string

  // import button
  isActiveImport: boolean;
  onClickImport?: () => void;
  textButtonImport?: ReactElement | string;

  // learn more
  isActiveLearn: boolean;
  textLearn?: ReactElement
  onClickLearn?: () => void;

  // main icon
  mainIcon: ReactElement

}

export const EmptyStateComponent = ({
  description,
  title,
  isActiveCreate,
  isActiveImport,
  isActiveLearn,
  onClickCreate,
  onClickImport,
  onClickLearn,
  textButtonCreate,
  textButtonImport,
  textLearn,
  mainIcon
}: EmptyProps) => {
  return (<>
    <Empty className="border rounded bg-gray-50">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {mainIcon}
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>
          {description}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">

        {isActiveCreate && (<>
          <Button onClick={onClickCreate} >{textButtonCreate ? textButtonCreate : 'Crear item'}</Button>
        </>)}

        {isActiveImport && (<>
          <Button onClick={onClickImport} variant="outline">{textButtonImport ? textButtonImport: 'Importar item'}</Button>
        </>)}

      </EmptyContent>
      {isActiveLearn && (<>
        <Button
          nativeButton={false}
          variant="link"
          className="text-muted-foreground"
          size="sm"
          onClick={onClickLearn}
          render={textLearn ? textLearn : <span>Learn More <ArrowUpRightIcon /></span>}
        >
        </Button>
      </>)}
    </Empty>
  </>)
}

