import type { EntityPresenterField } from "./entityPresenterField";

export type EntityPresenterItem = {
  id: string;
  name: string;
  fields: Array<EntityPresenterField>
}