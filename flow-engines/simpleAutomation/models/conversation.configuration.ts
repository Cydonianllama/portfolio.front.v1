import type { ConversationPlaform } from "./platform.enum.js";

export interface ConversationConfiguration {
  platform: ConversationPlaform;
  platformIdentificator: string;
  otherPlatform?: {
    id: string; // id si agregó otra plataforma;
  }
  message: {
    type: 'simple' | 'list' | 'image' | 'file' | 'video' | 'audio';
    id: string;
    message?: string,
    url?: string
    button?: { id: string, title: string }
    list?: { id: string, title: string }
  }
}