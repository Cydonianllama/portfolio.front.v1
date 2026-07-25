import { ExperienceDataItem, ProyectDataItem } from "./types";

export const proyectList: ProyectDataItem[] = [
  {
    title: 'Cydomat',
    description: 'Plataforma en desarrollo, flujos conversacionales, workflows, chat para administrar negocios emergentes.',
    tags: [
      'App',
    ],
    link: '/'
  },
  {
    title: 'Bot conversacional',
    description: 'Bot realizado con un sistema propio para manejar las conversaciones y recorrer un flujo definido y configurado. este agente tiene configuraciones estáticas, sin uso de agentes de IA',
    tags: [
      'TS',
      'Conversational flow builder',
    ],
    link: '/'
  },
  {
    title: 'Bot Agente IA',
    description: 'Agente configurado con un sistema propio ',
    tags: [
      'IA Agent',
    ],
    link: '/'
  },
  {
    title: 'Form builder',
    description: 'Librería realizada para mis proyectos personales, para construir de manera rápida los formularios de mi app',
    tags: [
      'Lib',
    ],
    link: '/'
  },
]

export const experienceList: ExperienceDataItem[] = [
  {
    company: 'Plazbot',
    period: '5 años',
    rol: 'Desarrollador',
    tasks: [
      'Mantenimiento la plataforma',
      'Desarrollo de herramienta para construccion de flujos conversacionales',
      'Soporte de herramienta'
    ]
  },
  {
    company: 'Tempus',
    period: '6 meses',
    rol: 'Soporte',
    tasks: [
      'Soporte consultando bases de datos',
      'Tareas de adecuacion de herramientas físicas para el proceso de la empresa'
    ]
  }
]