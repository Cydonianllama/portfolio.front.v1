import { Button } from "../../components/ui/button"
import { DataEngineProvider } from "."
import { DataEngine } from "./components/DataEngine"
import type { DataEngineConfiguration, EntityPresenterField, RecordPresenter, ViewPresenterItem } from "./types"

const ID_FIELD_ID = '3b2dg23'
const ID_FIELD_FULLNAE = '312e213'
const ID_FIELD_FILE_ORDER = '8aysbd9as'

export function TestSreen() {

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
    <div className='h-screen w-screen'>
      <DataEngineProvider>
        <div className="flex items-center h-12 justify-between px-4">
          <div></div>
          <Button onClick={() => {

          }}>
            Agregar record
          </Button>
        </div>
        <div>
          <DataEngine
          configuration={configuration}
          onModeChange={() => {

          }}
        />
        </div>
      </DataEngineProvider>
    </div>
  )
}