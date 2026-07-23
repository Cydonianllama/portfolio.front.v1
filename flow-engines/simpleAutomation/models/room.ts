export interface Room {
  id: string;
  creationDate: Date;
  variables: Array<{
    codeVariable: string
    value?: any | null,
    addedAt: Date,
    updatedAt?: Date | null,
  }>
}