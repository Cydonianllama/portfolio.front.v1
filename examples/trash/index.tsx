//
// compo - api - store
//

import { create } from "zustand";
import { api } from '@/setup/axios'
import { ResponseApi } from '@/types/api/response';
import { ResponsePagination } from "@/types/api/utils.pagination"
import { useEffect } from "react";
import { useAppData } from "@/hooks/app/useAppData";
import { toast } from "sonner";

// -------- a cambiar
// ComponentName
// ServiceName
// _NAME_STORE_
// ------------------

export const SectionPlans= () => {

  const store = usePlans()

  const useAppData = useAppData()

  const ListItems = async () => {
    try {
      
      store.setList({ list: [], listing: true })
      
      const items = await PlansSection({ workspaceId: useAppData.workspace?.id || '' })
      if (!items?.status){
        toast.error('[Error 1]')
        return;
      }

      if (!items?.data){
        toast.error('[Error 2]')
        return;
      }

      // store.setList({ list: items.data.list, pagination: items.pagination })

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
  
  </>
}

// _____________ service
// import { api } from '@/setup/axios'
// import { ResponseApi } from '@/types/api/response';
// import { ResponsePagination } from "@/types/api/utils.pagination"

interface PlansSectionRequestDTO {
  workspaceId: string
}

interface PlansSectionResponseDTO {
  list: Array<{ id: string, name: string }>
}

export const PlansSection = async (data: PlansSectionRequestDTO): Promise<ResponseApi<PlansSectionResponseDTO> | null> => {
  try {
    const req = await api.get(`/api/entity_api`);
    return req.data;
  } catch (ex) {
    return null;
  }
}

// _____________ store
/* eslint-disable @typescript-eslint/no-explicit-any */
//import { create } from "zustand";
//import { ResponsePagination } from "@/types/api/utils.pagination"

interface PlansStore {
  list: Array<{ id: string, name: string }>;
  pagination: ResponsePagination | null;
  listing: boolean;
  setList: (data : Partial<{ list: Array<{ id: string, name: string }>, listing: boolean, pagination: ResponsePagination | null }>) => void;
}

export const usePlans = create<PlansStore>((set) => ({
  list: [],
  listing: false,
  pagination: null,
  setList: (data) => set((state) => ({ ...state, ...data })),
}));
