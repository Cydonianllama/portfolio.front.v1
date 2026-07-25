import { StepsInitItem } from "../CardStepVariantDefault/steps.init";

export const stepsUX: StepsInitItem[] = [
  {
    actions: [
      { 
        code: 'invite',
        text: 'Invitar'
      },
      {
        code: 'done',
        text: 'Marcar como realizado'
      }
    ],
    done: false,
    showDone: true,
    title: 'Invita miembros a tu workspace'
  },
  {
    actions: [
      { 
        code: 'integration-whatsapp',
        text: 'Integrar whatsapp'
      },
      {
        code: 'integration-telegram',
        text: 'Integrar telegram'
      }
    ],
    done: false,
    showDone: true,
    title: 'Integra una plataforma'
  },
  {
    actions: [
      { 
        code: 'create-first-conversationalflow',
        text: 'Crear'
      },
    ],
    done: false,
    showDone: true,
    title: 'Crea tu primer flujo'
  },
  {
    actions: [
      { 
        code: 'goto-chat',
        text: 'Ir al chat'
      },
    ],
    done: false,
    showDone: false,
    title: 'Revisar tus chats'
  }
]
