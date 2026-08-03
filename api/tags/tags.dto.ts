export interface TagDTO {
  id: string;
  name: string;
}

// get many
export interface GetTagsRequestDTO {
  page: number;
  workspaceId: string;
}

export interface GetTagsResponseDTO {
  list: Array<TagDTO>
}
