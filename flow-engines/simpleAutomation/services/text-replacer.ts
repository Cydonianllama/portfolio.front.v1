import type { ConversationConfiguration } from "../models/conversation.configuration.js";
import type { Room } from "../models/room.js";
import type { Variables } from "../models/variables.js";

export class TextReplacer{

  private readonly conversationConfiguration: ConversationConfiguration;
  private readonly room: Room;
  
  constructor(conversationConfiguration: ConversationConfiguration, room: Room, variables: Array<Variables>){
    this.conversationConfiguration = conversationConfiguration;
    this.room = room; 
  }

  replace(text: string){
    this.conversationConfiguration;
    this.room;
    return ''
  }

}