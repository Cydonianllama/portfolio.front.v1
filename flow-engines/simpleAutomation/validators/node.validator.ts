import { NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING, NODE_TYPE_GENERAL_MESSAGE_SIMPLE, NODE_TYPE_GENERAL_MESSAGE_LIST, NODE_TYPE_GENERAL_MESSAGE_FILE, NODE_TYPE_GENERAL_MESSAGE_IMAGE, NODE_TYPE_GENERAL_MESSAGE_VOICE, NODE_TYPE_CONDITION, NODE_TYPE_REQUEST_SERVICE, NODE_TYPE_SEND_NOTIFICATION, NODE_TYPE_PRIVATE_MESSAGE, NODE_TYPE_NOTE, NODE_TYPE_ADDTAG, NODE_TYPE_REMOVETAG, NODE_TYPE_SETVAR, NODE_TYPE_START_AUTOMATION, NODE_TYPE_STOP_CURRENTAUTOMATION, NODE_TYPE_CODE, nodeTypes } from 'engines/simpleAutomation/models/node.automation.type.js';
import { ConversationPlatform } from 'engines/simpleAutomation/models/platform.enum.js';
import { z } from 'zod'


// Trigger
export const TriggerSchema = z.object({
  list: z.array(z.object({
    triggerId: z.string().trim(),
  })),
});

// Private Message
export const PrivateMessageSchema = z.object({
  content: z.string().trim(),
});

// Note
export const NoteSchema = z.object({
  content: z.string().trim(),
  color: z.string().trim(),
});

// Condition
export const ConditionSchema = z.object({
  rules: z.array(
    z.object({
      operator: z.enum(["AND", "OR"]),
      conditions: z.array(
        z.object({
          type: z.enum(["validate:variable", "validate:event"]),
          variableId: z.string().trim().optional(),
          operator: z.string().trim(),
          value: z.string().trim().optional(),
        }),
      ),
    }),
  ),
});

// Request Service
export const RequestServiceSchema = z.object({
  url: z.string().trim().url(),
  method: z.enum(["POST", "GET", "PUT", "DELETE"]),
  headers: z.array(
    z.object({
      key: z.string().trim(),
      value: z.string().trim(),
    }),
  ),
  body: z.string().optional(),
  mappers: z.array(
    z.object({
      path: z.string().trim(),
      saveId: z.string().trim(),
    }),
  ),
});

// Notification
export const SendNotificationSchema = z.object({
  content: z.string().trim(),
  scope: z.enum(["workspace", "user"]),
  userId: z.string().trim().optional(),
});

// Action
export const AddTagSchema = z.object({
  toAdd: z.array(
    z.object({
      tagId: z.string().trim(),
    }),
  ),
})

export const RemoveTagSchema = z.object({
  toRemove: z.array(
    z.object({
      tagId: z.string().trim(),
    }),
  ),
})

export const SetVariableSchema = z.object({
  variables: z.array(
    z.object({
      variableId: z.string().trim(),
      value: z.string(),
    }),
  ),
})

export const StartAutomationSchema = z.object({
  automationToStart: z.string().trim(),
})

export const StopAutomationSchema = z.object({})

export const SendMessageSchema = z.object({
  message: z.string(),
  buttons: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
  ),
})

export const SendListSchema = z.object({
  title: z.string(),
  buttonOpenText: z.string(),
  list: z.object({
    title: z.string(),
    buttonTitle: z.string(),
    sections: z.array(
      z.object({
        sectionTitle: z.string(),
        options: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            description: z.string().optional(),
          }),
        ),
      }),
    ),
  }),
})

export const SendFileSchema = z.object({
  fileId: z.string(),
  message: z.string(),
})

export const SendImageSchema = z.object({
  fileId: z.string(),
  message: z.string(),
})

export const SendVoiceSchema = z.object({
  fileId: z.string(),
  message: z.string(),
})

export const CodeSchema = z.object({
  scriptL: z.enum(['js', 'python']),
  content: z.string(),
})

export const NodeSchemaMap = {
  [NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING]: TriggerSchema,

  [NODE_TYPE_GENERAL_MESSAGE_SIMPLE]: SendMessageSchema,
  [NODE_TYPE_GENERAL_MESSAGE_LIST]: SendListSchema,
  [NODE_TYPE_GENERAL_MESSAGE_FILE]: SendFileSchema,
  [NODE_TYPE_GENERAL_MESSAGE_IMAGE]: SendImageSchema,
  [NODE_TYPE_GENERAL_MESSAGE_VOICE]: SendVoiceSchema,

  [NODE_TYPE_CONDITION]: ConditionSchema,
  [NODE_TYPE_REQUEST_SERVICE]: RequestServiceSchema,
  [NODE_TYPE_SEND_NOTIFICATION]: SendNotificationSchema,
  [NODE_TYPE_PRIVATE_MESSAGE]: PrivateMessageSchema,
  [NODE_TYPE_NOTE]: NoteSchema,

  [NODE_TYPE_ADDTAG]: AddTagSchema,
  [NODE_TYPE_REMOVETAG]: RemoveTagSchema,
  [NODE_TYPE_SETVAR]: SetVariableSchema,
  [NODE_TYPE_START_AUTOMATION]: StartAutomationSchema,
  [NODE_TYPE_STOP_CURRENTAUTOMATION]: StopAutomationSchema,

  [NODE_TYPE_CODE]: CodeSchema,
} as const;

export const ListSchemasConfigurationNode = [

  // messages

  z.object({
    type: z.literal(NODE_TYPE_GENERAL_MESSAGE_SIMPLE),
    configuration: SendMessageSchema,
  }),

  z.object({
    type: z.literal(NODE_TYPE_GENERAL_MESSAGE_LIST),
    configuration: SendListSchema,
  }),

  z.object({
    type: z.literal(NODE_TYPE_GENERAL_MESSAGE_FILE),
    configuration: SendFileSchema,
  }),

  z.object({
    type: z.literal(NODE_TYPE_GENERAL_MESSAGE_IMAGE),
    configuration: SendImageSchema,
  }),

  z.object({
    type: z.literal(NODE_TYPE_GENERAL_MESSAGE_VOICE),
    configuration: SendVoiceSchema,
  }),

  //

  z.object({
    type: z.literal(NODE_TYPE_ADDTAG),
    configuration: AddTagSchema,
  }),

  z.object({
    type: z.literal(NODE_TYPE_REMOVETAG),
    configuration: RemoveTagSchema,
  }),

  z.object({
    type: z.literal(NODE_TYPE_SETVAR),
    configuration: SetVariableSchema,
  }),

  z.object({
    type: z.literal(NODE_TYPE_START_AUTOMATION),
    configuration: StartAutomationSchema,
  }),

  z.object({
    type: z.literal(NODE_TYPE_STOP_CURRENTAUTOMATION),
    configuration: StopAutomationSchema,
  }),

  //

  z.object({
    type: z.literal(NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING),
    configuration: TriggerSchema,
  }),

  z.object({
    type: z.literal(NODE_TYPE_PRIVATE_MESSAGE),
    configuration: PrivateMessageSchema,
  }),

  z.object({
    type: z.literal(NODE_TYPE_NOTE),
    configuration: NoteSchema,
  }),

  z.object({
    type: z.literal(NODE_TYPE_CONDITION),
    configuration: ConditionSchema,
  }),

  z.object({
    type: z.literal(NODE_TYPE_REQUEST_SERVICE),
    configuration: RequestServiceSchema,
  }),

  z.object({
    type: z.literal(NODE_TYPE_SEND_NOTIFICATION),
    configuration: SendNotificationSchema,
  }),

] as const

export const AutomationNodeSchema = z.discriminatedUnion("type", ListSchemasConfigurationNode).and(
  z.object({
    id: z.string(),
    title: z.string(),
    creationDate: z.date(),
    nextNode: z.string().nullable(),
    automationId: z.string(),
    platform: z.nativeEnum(ConversationPlatform),
    position: z.object({
      x: z.number(),
      y: z.number(),
    }).optional()
  })
);



type AutomationNodeType = z.infer<typeof AutomationNodeSchema>

// const erick: AutomationNodeType = {
//   type: 'node.flow.start.automation',
//   configuration: {
//     configStartAutomation
//   }
// }