export interface ManagerV1Item {
  id: string;
  name: string;
  description: string;
  qtyItem: number;
  isPublish: boolean;
  statusCode: number;
  statusName: string;
  creationDate: Date;
}