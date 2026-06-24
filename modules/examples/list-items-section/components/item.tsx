import { useState } from "react";

// components
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// icons
import { LuDot } from "react-icons/lu";
import { Search } from "lucide-react"
import { PencilIcon, ShareIcon, TrashIcon } from "lucide-react"
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { BiDotsHorizontalRounded } from "react-icons/bi";

// sort
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
import { CSS } from "@dnd-kit/utilities";
import { ItemDTO } from "../dto";
import { ColorsSelector } from "../_config";

//
// ITEM
//

interface Props {
  id: string;
  data: ItemDTO
  onClickEdit?: (id: string, item: ItemDTO) => void
  onClickDelete?: (id: string, item: ItemDTO) => void
}

export const SortableItem = ({ id, data, onClickDelete, onClickEdit }: Props) => {
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

  const HandleClickEdit = (id: string, item: ItemDTO) => {
    if (onClickEdit) onClickEdit(id, item)
  }

  const HandleClickDelete = (id: string, item: ItemDTO) => {
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
            <div className={`h-2 w-2 rounded-full ${ColorsSelector.find(el => el.code == data.color)?.classname || 'bg-gray-500'}`}></div>
            {data.name}
          </ItemTitle>
          <LuDot />
          <span className="text-gray-500">{data.qtyAsociations} registros</span>
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