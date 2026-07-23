import type { MessageOriginType } from "./message.origin.type.js";
import type { MessageType } from "./message.type.js";

type fileMessage = {
  url: string;
  name: string;
  extention: string;
  size?: number;
}

type imageMessage = {
  url: string;
  name: string;
  extention: string;
  size?: number;
}

type listMessage = {
  title: string;
  buttonTitle: string;
  section: Array<{
    options: {
      title: string;
      description?: string;
      id: string;
    }
  }>
}

type buttonMessage = {
  list: Array<{
    id: string;
    title: string;
  }>
}

export interface Message {
  id: string;
  creationDate: Date;
  type: MessageType;
  message?: string;
  file?: fileMessage | null;
  image?: imageMessage | null;
  list?: listMessage | null,
  buttons?: buttonMessage | null,
  roomId: string;
  originType: MessageOriginType;
}