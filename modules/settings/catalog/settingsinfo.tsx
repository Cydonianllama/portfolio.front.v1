export enum tabsSettings {
  profile = 'profile',
  general = 'general',
  members = 'members',
  tags = 'tags',
  variables = 'variables',
  integrations = 'integrations',
  modules = 'modules',
  widgets = 'widgets',
  plans = 'plans',
  subscriptions = 'subscriptions',
}

export type SettingsItemConfig = {
  title: string,
  description: string,
  code: tabsSettings,
}

export const settingsInfo: SettingsItemConfig[] = [
  {
    title: 'Perfil',
    description: 'Edita los datos primordiales de tu usuario.',
    code: tabsSettings.profile
  },
  {
    title: 'General',
    description: 'Edita los datos básicos del workspace.',
    code: tabsSettings.general
  },
  {
    title: 'Miembros',
    description: 'Administra los miembros del workspace.',
    code: tabsSettings.members
  },
  {
    title: 'Etiquetas',
    description: 'Administra las etiquetas de contacto,',
    code: tabsSettings.tags
  },
  {
    title: 'Variables',
    description: 'Administra las variables de contacto.',
    code: tabsSettings.variables
  },
  {
    title: 'Integraciones',
    description: 'Administra las integraciones que ofrecemos.',
    code: tabsSettings.integrations
  },
  {
    title: 'Bases de datos',
    description: 'Administra las bases de datos creadas.',
    code: tabsSettings.modules
  },
  {
    title: 'Widgets',
    description: 'Administra tus widgets creados.',
    code: tabsSettings.widgets
  },
  {
    title: 'Planes',
    description: 'Administra el plan que tienes en la plataforma.',
    code: tabsSettings.plans
  },
  {
    title: 'Subscripciones',
    description: 'Administra la información de tu subscripción.',
    code: tabsSettings.subscriptions
  },
]