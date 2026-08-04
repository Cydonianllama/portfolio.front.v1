/* eslint-disable @typescript-eslint/no-empty-object-type */

import { RoomDTO } from "../chat/chat.dto";

export interface ContactDTO {
  id: string;
  fullname: string;
  mainPhone: string;
  mainEmail: string;
  mainDirection: string;
  creationDate: Date;
  conversations?: Array<RoomDTO>;
}

// get one

export interface GetContactRequestDTO {
  contactId: string;
}

export interface GetContactResponseDTO {
  contact: ContactDTO | null
}


// update one

export interface UpdateContactRequestDTO {
  id: string;
  fullname: string;
  mainEmail: string | null;
  mainDirection: string | null;
  mainPhone: string | null;
}

export interface UpdateContactRepsonseDTO {
  contact: ContactDTO | null
}

// create one

export interface CreateContactRequestDTO {
  fullname: string;
  workspaceId: string;
  mainEmail: string | null;
  mainDirection: string | null;
  mainPhone: string | null;
}

export interface CreateContactResponseDTO {
  contact: ContactDTO | null
}
