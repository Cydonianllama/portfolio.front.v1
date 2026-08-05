'use client'

import { DataEngineProvider } from '@erick/testcompos'
import { DataEngine } from '@erick/testcompos'
import type { DataEngineConfiguration, EntityPresenterField, RecordPresenter, ViewPresenterItem } from '@erick/testcompos'


import { useAppData } from "@/hooks/app/useAppData";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ModulesScreenProps = {
  moduleId: string
}

const ID_FIELD_ID = '3b2dg23'
const ID_FIELD_FULLNAE = '312e213'
const ID_FIELD_FILE_ORDER = '8aysbd9as'

export const ModulesScreen = ({ moduleId }: ModulesScreenProps) => {
  const useAppData = useAppData()
  const views: ViewPresenterItem[] = [
    {
      configuration: {
        mode: 'table'
      },
      filters: [],
      sorts: [],
      id: 'awdawd',
      name: 'table name 1'
    },
    {
      configuration: {
        mode: 'table'
      },
      filters: [],
      sorts: [],
      id: 'adwah5h6',
      name: 'table name 2'
    }
  ]

  const records: RecordPresenter[] = [
    {
      id: 'nwqodwqn0',
      values: {
        [ID_FIELD_ID]: 'jkjsdf',
        [ID_FIELD_FULLNAE]: 'Erick Manuel',
        [ID_FIELD_FILE_ORDER]: 1
      }
    },
    {
      id: '912ub2d1',
      values: {
        [ID_FIELD_ID]: 'awwaaw',
        [ID_FIELD_FULLNAE]: 'Pedro Pablo',
        [ID_FIELD_FILE_ORDER]: 15
      }
    },
    {
      id: 'asd9b1d3',
      values: {
        [ID_FIELD_ID]: 'awdaw4',
        [ID_FIELD_FULLNAE]: 'Keiko sofía',
        [ID_FIELD_FILE_ORDER]: 22
      }
    }
  ]

  const fields: EntityPresenterField[] = [
    {
      id: ID_FIELD_ID,
      name: 'Id',
      type: 'string'
    },
    {
      id: ID_FIELD_FULLNAE,
      name: 'Fullname',
      type: 'string'
    },
    {
      id: ID_FIELD_FILE_ORDER,
      name: 'FileOrder',
      type: 'number'
    }
  ]

  const configuration: DataEngineConfiguration = {
    entityInformation: {
      fields: fields,
      id: '87mpdsc72',
      name: 'Productos'
    },

    id: 'test',
    moduleConfiguration: {
      showViews: true
    },
    records: {
      list: records,
      pagination: {
        hasNextPage: false,
        hasPreviousPage: false,
        limit: 20,
        page: 1,
        total: 1000,
        totalPages: 50
      }
    },

    views: views,

    onFieldAdded: () => {

    },
    onRecordUpdated: () => {

    },
    onFieldDeleted: () => {

    },
    onFieldUpdated: () => {

    },
    onRecordAdded: () => {

    },
    onRecordDeleted: () => {

    }
  }

  return (
    <div className='h-full w-full px-5'>
      <DataEngineProvider>
        <DataEngine configuration={configuration} />
      </DataEngineProvider>
    </div>
  )
}