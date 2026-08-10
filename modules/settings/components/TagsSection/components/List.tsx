import { MdOutlineLabel } from "react-icons/md";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { EmptyStateComponent } from "@/components/Empty";
import { SpinnerListing } from "@/components/Listing";
import { ErrorStateComponent } from "@/components/Error";
import { ResponsePagination } from "@/types/api/utils.pagination";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { TagDTO } from "@/api/tags/tags.dto";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PencilIcon, TrashIcon } from "lucide-react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LuDot } from "react-icons/lu";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { CSS } from "@dnd-kit/utilities";

type TagListProps = {
  list: Array<TagDTO>,
  isLoading: boolean
  isError: boolean
  HandleDragEndEvent?: (event: DragEndEvent) => void;
  onClickEdit?: (id: string, item: TagDTO) => void
  onClickDelete?: (id: string, item: TagDTO) => void
}

export const TagList_ = ({ isLoading, isError, list, HandleDragEndEvent, onClickDelete, onClickEdit }: TagListProps) => {

  const handleDragEndEvent = (event: DragEndEvent) => {
    if (HandleDragEndEvent) HandleDragEndEvent(event)
  }

  return (<>
    <section>
      {isLoading && (<>
        <SpinnerListing
          title="Items"
          description="Listando sus items."
        />
      </>)}

      {(!isLoading && isError) && (<>
        <ErrorStateComponent
        />
      </>)}

      {(!isLoading && !isError) && (<>

        {list.length > 0 && (<>
          <ItemGroup >
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEndEvent}
            >
              <SortableContext
                items={list}
                strategy={verticalListSortingStrategy}
              >
                {list.map((item, idx) => (<SortableItem id={item.id}  data={item} key={idx} onClickDelete={onClickDelete} onClickEdit={onClickEdit} />))}
              </SortableContext>
            </DndContext>
          </ItemGroup>
        </>)}

        {list.length == 0 && (<>
          <EmptyStateComponent
            description="Usted no cuenta con items."
            title="Items"
            isActiveCreate
            isActiveImport={false}
            isActiveLearn={false}
            onClickCreate={() => {}}
            textButtonCreate={'Agregar item'}
            mainIcon={<MdOutlineLabel/>}
          />
        </>)}

      </>)}

    </section>

  </>)
}

type colorsSelector = {
  name: string,
  code: string,
  classname: string
}

export const ColorsSelector: Array<colorsSelector> = [
  {
    code: 'color::default',
    name: 'Default',
    classname: 'bg-gray-500'
  },
  {
    code: 'color::green',
    name: 'Verde',
    classname: 'bg-green-500'
  },
  {
    code: 'color::red',
    name: 'Rojo',
    classname: 'bg-red-500'
  },
  {
    code: 'color::blue',
    name: 'Azul',
    classname: 'bg-blue-500'
  },
  {
    code: 'color::yellow',
    name: 'Amarillo',
    classname: 'bg-yellow-500'
  },
]

//
// ITEM
//

interface SortableItemProps {
  id: string;
  data: TagDTO
  onClickEdit?: (id: string, item: TagDTO) => void
  onClickDelete?: (id: string, item: TagDTO) => void
}

export const SortableItem = ({ id, data, onClickDelete, onClickEdit }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // padding: "12px",
    // border: "1px solid #ccc",
    // borderRadius: "8px",
    // marginBottom: "8px",
    // background: "white",
    cursor: "grab",
  };

  //
  //
  //

  const HandleClickEdit = (id: string, item: TagDTO) => {
    if (onClickEdit) onClickEdit(id, item)
  }

  const HandleClickDelete = (id: string, item: TagDTO) => {
    if (onClickDelete) onClickDelete(id, item)
  }

  return (
    <Item
      size={'xs'}
      ref={setNodeRef}
      style={style}

      className="bg-gray-50"
      variant="outline"
    >
      <ItemMedia
        {...attributes}
        {...listeners}
        variant="icon"
      >
        <PiDotsSixVerticalBold />
      </ItemMedia>
      <ItemContent>

        <div className="flex items-center gap-1.5">
          <ItemTitle className="font-semibold">
            {/* <div className={`h-2 w-2 rounded-full ${ColorsSelector.find(el => el.code == data.color)?.classname || 'bg-gray-500'}`}></div> */}
            {data.name}
          </ItemTitle>
          <LuDot />
          <span className="text-gray-500">x registros</span>
        </div>
        {/* <ItemDescription>
          A simple item with title and description.
        </ItemDescription> */}
      </ItemContent>
      <ItemActions>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size={'icon'}><BiDotsHorizontalRounded /></Button>} />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => {
                HandleClickEdit(id, data)
              }}>
                <PencilIcon />
                Edit
              </DropdownMenuItem>
              {/* <DropdownMenuItem>
                <ShareIcon />
                Share
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive" onClick={() => {
                HandleClickDelete(id, data)
              }}>
                <TrashIcon />
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ItemActions>
    </Item>
  );
};

export type TagFooterTableProps = {
  HandleToNextPage: () => void;
  HandleToPrevPage: () => void;
  pagination: ResponsePagination | null;
}

export const TagFooterTable = ({ HandleToNextPage, HandleToPrevPage, pagination }: TagFooterTableProps) => {
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