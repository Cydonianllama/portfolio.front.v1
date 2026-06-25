export type tabsAvailables = 'Active' | 'Pending' | 'Blocked'

type configurationModule = {
  mainAPIroute: string,
  codetable: string,
  tabs: Array<tabsAvailables> 
}

export const configurationModule: configurationModule = {
  mainAPIroute: '/api/',
  codetable: 'listmanager1',
  tabs: [
    'Active',
    'Pending',
    'Blocked'
  ]
}