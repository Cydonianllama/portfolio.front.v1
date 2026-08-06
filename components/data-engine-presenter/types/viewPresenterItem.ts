import type { FilterPresenterItem, SortPresenterItem } from ".";
import type { ViewPresenterConfiguration } from "./viewPresenterConfiguration";

export type ViewPresenterItem = {
  id: string;
  name: string;
  filters: Array<FilterPresenterItem>
  sorts: Array<SortPresenterItem>
  configuration: ViewPresenterConfiguration;
}