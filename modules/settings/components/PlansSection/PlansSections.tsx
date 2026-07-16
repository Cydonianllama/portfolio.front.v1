//
// compo - api - store
//

import { create } from "zustand";
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ResponsePagination } from "@/types/api/utils.pagination"
import { useEffect } from "react";
import { UseAppData } from "@/hooks/app/useAppData";
import { toast } from "sonner";
import { GetPlans } from "./service.getplans";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// -------- a cambiar
// ComponentName
// ServiceName
// _NAME_STORE_
// ------------------

export const PlansSection= () => {

  const store = usePlans()

  const useAppData = UseAppData()

  const ListItems = async () => {
    try {
      
      store.setList({ list: [], listing: true })
      
      const items = await GetPlans({ workspaceId: useAppData.workspace?.id || '' })
      if (!items?.status){
        toast.error('[Error 1]')
        return;
      }

      if (!items?.data){
        toast.error('[Error 2]')
        return;
      }

      store.setList({ list: items.data.list }) // pagination: items.pagination

    } catch (ex) {
      toast.error('Error desconocido')
    } finally {
      store.setList({ listing: false })
    }
  }

  const OnInit = () => {
    ListItems()
  }

  useEffect(() => {
    OnInit()
  }, [])

  return <>
    <div className="grid grid-cols-3 gap-3">
      {store.list.map((el, index) => (<Card key={index}>
      <CardHeader>
        <CardTitle>{el.name}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>))}
    </div>
  </>
}

// _____________ store
/* eslint-disable @typescript-eslint/no-explicit-any */
//import { create } from "zustand";
//import { ResponsePagination } from "@/types/api/utils.pagination"

interface PlanStore {
  list: Array<{ id: string, name: string }>;
  pagination: ResponsePagination | null;
  listing: boolean;
  setList: (data : Partial<{ list: Array<{ id: string, name: string }>, listing: boolean, pagination: ResponsePagination | null }>) => void;
}

export const usePlans = create<PlanStore>((set) => ({
  list: [],
  listing: false,
  pagination: null,
  setList: (data) => set((state) => ({ ...state, ...data })),
}));
