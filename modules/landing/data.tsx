import { CardFeaturesItem, IntegrationsItem } from "./types";

export const featureList: Array<CardFeaturesItem> = [
  {
    title: 'Flujos conversaciones',
    description: 'Interga tus redes',
    code: 'conversational-flow',
  },
  {
    title: 'Flujos conversaciones de llamada',
    description: 'Configura flujos de tus llamadas',
    code: 'call-flow',
  },
  {
    title: 'Workflows',
    description: 'Automatiza tu trabajo desarrollando flujos.',
    code: 'conversational-flow',
  },
  {
    title: 'Databases',
    description: 'Administra tu data con nuestras bd',
    code: 'databases',
  },
  {
    title: 'Módulos especializados',
    description: 'No necesitas configurar desde cero, puedes utilizar nuestros módulos especializados',
    code: 'especialized-modules',
  },
  {
    title: 'CRM',
    description: 'Administra tus clientes de forma sencilla.',
    code: 'especialized-modules',
  },
  {
    title: 'Módulos especializados',
    description: 'No necesitas configurar desde cero, puedes utilizar nuestros módulos especializados',
    code: 'especialized-modules',
  },
]

export const integrationList: IntegrationsItem[] = [
  {
    code: 'whatsapp',
    description: 'Administra tus conversaciones de whatsapp con nuestra plataforma',
    title: 'Whatsapp'
  },
  {
    code: 'telegram',
    description: 'Administra tus conversaciones de telegram en nuetra plataforma',
    title: 'Telgram'
  },
  {
    code: 'supabase',
    description: 'Adminitra tu data y dale más funcionalidades',
    title: 'Whatsapp'
  },
  {
    code: 'notion',
    description: 'Obten la data con la que trabajas.',
    title: 'Notion'
  },
  {
    code: 'google.sheets',
    description: 'Administra tus documentos',
    title: 'Google sheets'
  },
  {
    code: 'google.calendar',
    description: 'Automatiza tu calendario con nuestras funcionalidades',
    title: 'Google calendar'
  },
  {
    code: 'google.docs',
    description: 'Tus documentos podrán ser usados para automaizar partes de tu trabajo',
    title: 'Google docs'
  },
  {
    code: 'google.maps',
    description: 'Indispensable en nuestro módulo de restaurantes',
    title: 'Google maps'
  }
]