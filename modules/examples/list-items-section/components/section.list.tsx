import { useState } from "react";

// components
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
import { SortableItem } from "./item";
import { ItemDTO } from "../models/model";
import { EmptyStateComponent } from "@/components/Empty";
import { SpinnerListing } from "@/components/Listing";
import { ErrorStateComponent } from "@/components/Error";

type SectionListProps = {
  list: Array<ItemDTO>
  isLoading: boolean
  isError: boolean
  HandleDragEndEvent?: (event: DragEndEvent) => void
}

export const SectionList = ({ isLoading, isError, list }: SectionListProps) => {
  //
  // SORTABLE ITEMS
  //

  const [items, setItems] = useState([
    "Elemento 1",
    "Elemento 2",
    "Elemento 3",
    "Elemento 4",
    "Elemento 5",
    "Elemento 6",
    "Elemento 7",
    "Elemento 8",
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setItems((currentItems) => {
      const oldIndex = currentItems.indexOf(active.id as string);
      const newIndex = currentItems.indexOf(over.id as string);
      return arrayMove(currentItems, oldIndex, newIndex);
    });
  };

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

        {items.length > 0 && (<>
          <ItemGroup >
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
              >
                {items.map((item, idx) => (<SortableItem id={item} key={idx} />))}
              </SortableContext>
            </DndContext>
          </ItemGroup>
        </>)}

        {items.length == 0 && (<>
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