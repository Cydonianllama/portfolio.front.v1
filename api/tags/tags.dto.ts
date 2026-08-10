export interface TagDTO {
  id: string;
  name: string;
  color?: string;
  index?: number;
}

// get one
export interface GetTagRequestDTO {
  id: string;
}

export interface GetTagResponseDTO {
  tag: TagDTO | null
}

// get many
export interface GetTagsRequestDTO {
  page: number;
  workspaceId: string;
}

export interface GetTagsResponseDTO {
  list: Array<TagDTO>
}

// update one
export interface UpdateTagRequestDTO {
  name?: string;
  color?: string;
  workspaceId: string;
}

export interface UpdateTagResponseDTO {
  tag: TagDTO | null
}

// delete one
export interface DeleteTagRequestDTO {
  id: string
  workspaceId: string
}

export interface DeleteTagResponseDTO {
  id: string
}

// create one
export interface CreateTagRequestDTO {
  name: string;
  color?: string;
  workspaceId: string;
}

export interface CreateTagResponseDTO {
  tag: TagDTO | null
}
// #endregion API