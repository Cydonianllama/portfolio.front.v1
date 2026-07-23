// runtime
import type { IPlatformAdapter } from "../adapters/platform.adapter.js";
import type { NodeType } from "../models/node.automation.type.js";
import type { IAutomationNode } from "../models/node.automation.js";
import type { IPublishedAutomation } from "../models/published.automation.js";
import type { IRoomExecutionStateMachine } from "../state-machine/room.execution.statemachine.js";
import type { RoomExecution } from "../models/room.execution.js";
import type { ConversationConfiguration } from "../models/conversation.configuration.js";
import type { IIntegrationRepository } from "../repositories/integration.repository.js";
import type { IPublishedAutomationRepository } from "../repositories/published.automation.repository.js";
import type { IUserRepository } from "../repositories/user.repository.js";
import type { IWorkspaceRepository } from "../repositories/workspace.repository.js";
import type { ITriggerRepository } from "../repositories/trigger.repository.js";
import type { IRoomExecutionRepository } from "../repositories/room.execution.repository.js";
import type { IPlatformAdapterFactory } from "../factories/platform.factories.js";
import { ConversationPlaform } from "../models/platform.enum.js";
import type { IRoomRepository } from "../repositories/room.repository.js";
import type { Room } from "../models/room.js";
import { TriggerMatcher } from "../services/trigger-matcher.js";
import type { NodeExecutor } from "../executors/node-executors/_node.executor.js";
import type { IMessageRepository } from "../repositories/message.repository.js";
import type { IVariableRepository } from "../repositories/variables.repository.js";

export interface IRuntimeSimpleAutomation {
  platform: IPlatformAdapter | null;
  publishedAutomation: IPublishedAutomation | null;
  room: Room | null;
  roomExecution: RoomExecution | null;

  //
  conversationConfiguration: ConversationConfiguration;
  executors: Map<NodeType, NodeExecutor>;
  roomExecutionStateMachine: IRoomExecutionStateMachine
  platformFactory: IPlatformAdapterFactory

  // repos
  integrationRepo: IIntegrationRepository,
  publishedAutomationRepo: IPublishedAutomationRepository
  userRepo: IUserRepository
  workspaceRepo: IWorkspaceRepository
  triggerRepo: ITriggerRepository
  roomExecutionRepo: IRoomExecutionRepository
  roomRepo: IRoomRepository
  messageRepo: IMessageRepository
  variablesRepo: IVariableRepository

  // methods
  replaceVariables: () => void;
  goto: (id: string) => void; // reemplaza mi clasico trasverse
  stop: () => void;
  start: () => void;
  execute: (node: IAutomationNode) => void;
}

// contexto para pasar a mi executor
export interface IRuntimeSimpleAutomationContext {
  platform: IPlatformAdapter | null;
  publishedAutomation: IPublishedAutomation | null;
  room: Room | null;
  roomExecution: RoomExecution | null;

  // repos
  integrationRepo: IIntegrationRepository,
  publishedAutomationRepo: IPublishedAutomationRepository
  userRepo: IUserRepository
  workspaceRepo: IWorkspaceRepository
  triggerRepo: ITriggerRepository
  roomExecutionRepo: IRoomExecutionRepository
  roomRepo: IRoomRepository
  messageRepo: IMessageRepository
  variablesRepo: IVariableRepository

  conversationConfiguration: ConversationConfiguration;
  executors: Map<NodeType, NodeExecutor>;
  roomExecutionStateMachine: IRoomExecutionStateMachine;
  replaceVariables: () => void;
}

interface RuntimeSimpleAutomationConstructor {
  conversationConfiguration: ConversationConfiguration;
  executors: Map<NodeType, NodeExecutor>
  roomExecutionStateMachine: IRoomExecutionStateMachine
  platformFactory: IPlatformAdapterFactory

  // repos
  integrationRepo: IIntegrationRepository,
  publishedAutomationRepo: IPublishedAutomationRepository
  userRepo: IUserRepository
  workspaceRepo: IWorkspaceRepository
  triggerRepo: ITriggerRepository
  roomExecutionRepo: IRoomExecutionRepository
  roomRepo: IRoomRepository
  messageRepo: IMessageRepository
  variablesRepo: IVariableRepository
}

export class FlowRuntimeSimpleAutomation implements IRuntimeSimpleAutomation {
  public platform: IPlatformAdapter | null = null;
  public publishedAutomation: IPublishedAutomation | null = null;
  public room: Room | null = null;
  public roomExecution: RoomExecution | null = null;

  public readonly conversationConfiguration: ConversationConfiguration;
  public readonly executors: Map<NodeType, NodeExecutor>;
  public readonly roomExecutionStateMachine: IRoomExecutionStateMachine;
  public readonly roomRepo: IRoomRepository;
  public readonly messageRepo: IMessageRepository;
  public readonly variablesRepo: IVariableRepository;

  public readonly integrationRepo: IIntegrationRepository;
  public readonly publishedAutomationRepo: IPublishedAutomationRepository;
  public readonly userRepo: IUserRepository;
  public readonly workspaceRepo: IWorkspaceRepository;
  public readonly triggerRepo: ITriggerRepository
  public readonly roomExecutionRepo: IRoomExecutionRepository
  public readonly platformFactory: IPlatformAdapterFactory

  constructor(data: RuntimeSimpleAutomationConstructor) {
    this.executors = data.executors
    this.roomExecutionStateMachine = data.roomExecutionStateMachine
    this.conversationConfiguration = data.conversationConfiguration
    this.platformFactory = data.platformFactory

    // repos
    this.integrationRepo = data.integrationRepo
    this.publishedAutomationRepo = data.publishedAutomationRepo
    this.userRepo = data.userRepo
    this.workspaceRepo = data.workspaceRepo
    this.triggerRepo = data.triggerRepo
    this.roomExecutionRepo = data.roomExecutionRepo
    this.roomRepo = data.roomRepo
    this.messageRepo = data.messageRepo
    this.variablesRepo = data.variablesRepo
  }

  async execute(node: IAutomationNode) {
    const executor = this.executors?.get(node.type)
    if (!executor) {
      return console.log(`[execute] executor not founded`)
    }

    const responseExecutor = await executor.execute(node, this)

    if (responseExecutor.status == 'success') {

    }
    else if (responseExecutor.status == 'warning') {

    }
    else if (responseExecutor.status == 'error') {

    }

    if (responseExecutor.next) {
      this.goto(responseExecutor.next)
    }
  }

  goto(id: string) {
    const node = this.publishedAutomation?.nodes.find(el => el.id == id)
    if (!node) {
      return console.log('[goto] node not founded');
    }
    this.execute(node)
  }

  stop() {

  }

  replaceVariables() {

  }

  async start() {

    //
    // prevalidation
    //

    // validar integracion
    const integration = await this.integrationRepo.GetIntegrationInformation({ identificator: this.conversationConfiguration.platformIdentificator, platform: this.conversationConfiguration.platform })
    if (!integration.founded) {
      return this.stop()
    }

    // validar workspace
    const workspace = await this.workspaceRepo.GetInformation({ workspaceId: integration.workspaceId })
    if (!workspace.founded) {
      return this.stop()
    }

    // validar usuario
    const user = await this.userRepo.GetInformation({ userId: workspace.userId })
    if (!user.canUseAutomation) {
      return this.stop()
    }

    //
    // init automation build
    //

    // validar room
    const room = await this.roomRepo.Get({ platform: this.conversationConfiguration.platform, platformIdentificator: this.conversationConfiguration.platformIdentificator, workspaceId: workspace.id });

    if (room.founded && room.room) {
      this.room = room.room
    } else {
      //TODO: create new room
    }


    // validar room execution
    const roomExecution = await this.roomExecutionRepo.GetInformation({ roomId: this.room?.id || '' })
    if (roomExecution.founded && roomExecution.roomExecution) {
      this.roomExecution = roomExecution.roomExecution
    } else {
      //TODO: create new roomExecution
    }

    // TODO: validar estados de roomExecution

    // validar triggers
    const triggers = await this.triggerRepo.GetAll({ workspaceId: workspace.id, platforms: [ConversationPlaform.general] })
    if (!triggers.status) {
      return this.stop()
    }

    // trigger macher
    const triggerMatcher = new TriggerMatcher()
    const match = await triggerMatcher.Match({ triggers: triggers.list, conversationConfiguration: this.conversationConfiguration })

    if (!match.matched){
      return this.stop();
    }

    // validamos automatizacion a ejecutar
    const publishedAutomation = await this.publishedAutomationRepo.GetInformation({ id: match.trigger?.id || '' })
    if (!publishedAutomation.status){
      return this.stop();
    }

    // construimos entidades finales
    this.platform = await this.platformFactory.create(this.conversationConfiguration.platform)

    // validar room execute 
    const initNodeId = this.publishedAutomation?.startNodeId
    if (initNodeId) this.goto(initNodeId)
  };
}

// interface NodeExecutionContext {
//     platform: IPlatformAdapter;
//     logger: ILogger;
//     variables: VariablesManager;
// }