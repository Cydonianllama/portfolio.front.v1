'use client'

import { useEffect, useState } from "react"
import { api } from '@/setup/axios'
import { ResponsePagination } from "@/types/utils.pagination"

type EntityHookList = 'workspace' | 'user' | 'automation';

type AvailableEntity = {
  uri: string;
};

export type useEntitiesListConfiguration = {
  entity: EntityHookList,
  query: string,
  page: number
}

export const UseEntitiesList = <T,>(data: useEntitiesListConfiguration) => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<T[]>([])
  const [pagination, setPagination] = useState<ResponsePagination | null>(null)
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const availables: Record<EntityHookList, AvailableEntity> = {
    workspace: {
      uri: '/api/workspaces'
    },
    user: {
      uri: '/api/users'
    },
    automation: {
      uri: '/api/automations'
    }
  };

  const ListEntities = async () => {
    try {
      setLoading(true)

      const uri = availables[data.entity]?.uri || ''

      if (!uri) return console.log('Entity not found')

      setError(false)

      if (data.page == 1) {
        setList([])
      }

      const req = await api.get(`${uri}?query=${data.query}&page=${data.page}`)
      const res = req.data;

      if (res.status) {
        const data_ = res.data;
        const pagination = res.pagination;


        setPagination(pagination)

        if (data.page == 1) {
          setList(data_)
        } else {
          setList((prev) => [...prev, ...data_])
        }
      } else {
        setErrorMessage(res.message || 'Error inesperado')
        setError(true)
      }

    } catch (ex) {
      setError(true)
      setErrorMessage(ex instanceof Error ? ex.message : 'Error inesperado')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    ListEntities()
  }, [data.query, data.page, data.entity])


  return {
    list,
    pagination,
    error,
    errorMessage,
    loading
  }
}