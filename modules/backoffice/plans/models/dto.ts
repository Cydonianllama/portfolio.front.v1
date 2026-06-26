/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface PlanDTO {
  id: string;
  name: string;
  creationDate: Date;
  qty: number;
}


// request

export interface GetPlanRequestDTO {
  query: string;
  page: number;
}

export interface CreatePlanRequestDTO {
  name: string;
}

export interface UpdatePlanRequestDTO {
  id: string;
  name: string;
}

export interface DeletePlanRequestDTO {
  id: string;
}


// response
export interface CreatePlanResponseDTO {
  plan: PlanDTO | null
}

export interface UpdatePlanRepsonseDTO {
  plan: PlanDTO | null
}

export interface GetPlanResponseDTO {
  plan: PlanDTO | null
}

export interface GetPlansResponseDTO {
  list: Array<PlanDTO>
}

export interface DeletePlanResponseDTO {
  id: string
}