export type filtertabsAvailables = 'Active' | 'Pending' | 'Blocked'
export type tabsAvailables = 'Overview' | 'List' 

type configurationModule = {
  mainAPIroute: string,
  codetable: string,
  filterTabs: Array<filtertabsAvailables>
  tabs: Array<tabsAvailables>
}

export const configurationModule: configurationModule = {
  mainAPIroute: '/api/backoffice/plans',
  codetable: 'listplansbackoffice',
  filterTabs: [
    'Active',
    'Pending',
    'Blocked'
  ],
  tabs: [
    'Overview',
    'List',
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
  isActive: false,
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
  default: 'List',
  list: [
    {
      title: 'Overview'
    },
    {
      title: 'List'
    },
  
  ]
}