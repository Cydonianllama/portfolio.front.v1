/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

// PASOS
// 1. configurar "columnsUsersTable"
//



// utils
import { useState } from "react";

// components
import { ManagerV1DialogCreate } from "./dialog.create";
import { ManagerV1DialogEdit } from "./dialog.edit";
import { ManagerV1DialogConfirmDelete } from "./dialog.confirmdelete";
import { SectionHeader } from './section.header';
import { SectionTable } from './section.table';
import { SectionFooterTable } from "./section.footerTable";
import { SectionHeaderFilter } from "./section.headerFilter";

// listado principal
import { useListManagerV1 } from "@/modules/example1/hooks/useListManagerV1";
// store
import { useManagerv1Store } from "./store";



export const Managerv1Screen = () => {

  const moduleState = useManagerv1Store();

  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  const { data, isLoading, error } = useListManagerV1(
    page,
    query
  );


  //
  // DIALOG
  //
  const OnCreateItem = async () => {

  }

  const OnUpdateItem = async () => {

  }

  const OnDeleteItem = async () => {

  }


  return (<>
    <div className="relative h-full px-12 flex flex-col">

      {/* start::header */}
      <SectionHeader />
      {/* end::header */}

      {/* start::header filter  */}
      <SectionHeaderFilter/>
      {/* end::header filter  */}

      {/* start::table */}
      <SectionTable/>
      {/* end::table */}


      {/* start::footer table */}
      <SectionFooterTable />
      {/* end::footer table */}


      {/* start::Dialogs */}
      <ManagerV1DialogCreate
        open={moduleState.isOpenCreateItem}
        setOpen={(open) => moduleState.setOpenCreateItem(open)}
        onCreate={OnCreateItem}
      />

      <ManagerV1DialogEdit
        open={moduleState.isOpenUpdateItem}
        setOpen={(open) => moduleState.setOpenUpdateItem(open)}
        onUpdate={OnUpdateItem}
      />

      <ManagerV1DialogConfirmDelete
        open={moduleState.isOpenDeleteItem}
        setOpen={(open) => moduleState.setOpenDeleteItem(open)}
        onDelete={OnDeleteItem}
      />
      {/* end::Dialogs */}
    </div>
  </>)
}