"use client"

import { useEffect, useState } from "react";

// components
import { Separator } from "@/components/ui/separator"
import { Header } from "./section.header";
import { SectionList } from "./section.list";
import { GetItem } from "../services/get.items";
import { useManagerv1Store } from "../store/store";

//
// Screen
//

export const ListItemScreen = () => {

  const [page, setPage] = useState(1)
  const [textQuery, setTextQuery] = useState('')

  const state = useManagerv1Store()

  const ListItems = async () => {
    try {
      state.setinformationListItem({ loading: true, hasError: false, errorMessage: '' })
      const req = await GetItem({ page: page, query: textQuery })

      if (!req?.status){
        state.setinformationListItem({ hasError: true, errorMessage: 'No obtuvimos data'})
        return;
      }

      if (!req?.data){
        state.setinformationListItem({ hasError: true, errorMessage: 'No obtuvimos data'})
        return;
      }

      if (req.data) {
        state.setinformationListItem({ list: req.data.list || [], pagination: req.pagination || null })
      }

      
    } catch (error) {
      state.setinformationListItem({ hasError: true, errorMessage: 'Error inesperado'})
    } finally {
      state.setinformationListItem({ loading: false })
    }
  }

  //
  // ON INIT
  //

  useEffect(() => {
    ListItems()
  }, [])

  return (<>

    <div className="relative h-full px-60 flex flex-col gap-3">
      {/*  */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl">Labels</h1>
          <p className="text-md">Manage team <strong>Company</strong> specific labels.</p>
        </div>

        <Separator />

        <div className="gap-1.5 flex flex-col">
          <p className="text-md">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi repudiandae aut dolorum officiis laudantium veritatis saepe sapiente! Quibusdam voluptates nihil quia id sequi animi sit labore. Optio, obcaecati! Ab fugiat officia itaque.</p>
          <p className="text-md">Lorem ipsum dolor sit  veritatis saepe sapiente! Quibusdam voluptates nihil quia id sequi animi sit labore. Optio, <strong>obcaecati! Ab fugiat officia itaque.</strong></p>
        </div>
      </section>
      {/*  */}

      {/*  */}
      <Header 
      />
      {/*  */}

      {/*  */}
      <SectionList
        isError={(state.informationListItem.hasError) ? true : false}
        isLoading={state.informationListItem.loading}
        list={state.informationListItem.list}
        HandleDragEndEvent={() => {}}
      />
      {/*  */}
    </div>

  </>)
}