export interface ConversationFilterDTO {
  name: string
}

// update
export interface UpdateConversationFilterRequestDTO {
  id: string;
  name: string;
}

export interface UpdateConversationFilterResponseDTO {
  conversationFilter: ConversationFilterDTO | null
}

// get many
export interface GetConversationsFilterRequestDTO {
  page: number
}

export interface GetConversationsFilterResponseDTO {
  list: Array<ConversationFilterDTO>
}

// get one
export interface GetConversationFilterRequestDTO {
  id: string;
}

export interface GetConversationFilterResponseDTO {
  conversationFilter: ConversationFilterDTO | null
}

// delete one
export interface DeleteConversationFilterRequestDTO {
  id: string
}

export interface DeleteConversationFilterResponseDTO {
  id: string
}

// create one
export interface CreateConversationFilterRequestDTO {
  name: string
}
  
export interface CreateConversationFilterResponseDTO {
  conversationFilter: ConversationFilterDTO | null
}
  