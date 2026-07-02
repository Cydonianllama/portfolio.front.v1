export type filtertabsAvailables = 'Active' | 'Pending' | 'Blocked'
export type tabsAvailables = 'Overview' | 'Analitics' | 'Report' | 'Preferences'

type configurationModule = {
  mainAPIroute: string,
  codetable: string,
  filterTabs: Array<filtertabsAvailables>
  tabs: Array<tabsAvailables>
}

export const configurationModule: configurationModule = {
  mainAPIroute: '/api/',
  codetable: 'listmanager1',
  filterTabs: [
    'Active',
    'Pending',
    'Blocked'
  ],
  tabs: [
    'Overview',
    'Analitics',
    'Report',
    'Preferences'
  ]
}

//
//
//

type MainTabListConfiguration = {
  isActive: boolean;
  list: Array<{
    code: string,
    title: string,
  }>
}

export const mainTabListConfiguration: MainTabListConfiguration = {
  isActive: true,
  list: [
    {
      code: 'admin',
      title: 'Administrador'
    },
    {
      code: 'products',
      title: 'Productos'
    },
    {
      code: 'users',
      title: 'Usuarios'
    },
    {
      code: 'tags',
      title: 'Etiquetas'
    }
  ]
} 

//
// tabs
//

type TabListConfiguration = {
  default: tabsAvailables
  list: Array<{
    title: string
  }>
}

export const tabListConfiguration: TabListConfiguration = {
  default: 'Overview',
  list: [
    {
      title: 'Overview'
    },
    {
      title: 'Analitics'
    },
    {
      title: 'Report'
    },
    {
      title: 'Preferences'
    }
  ]
}