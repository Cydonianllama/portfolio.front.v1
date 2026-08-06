/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EntityPresenterItem } from "./entityPresenterItem";
import type { ModuleConfiguration } from "./moduleConfiguration";
import type { OnFieldAddedData } from "./onFieldAdded";
import type { OnFieldDeleteData } from "./onFieldDeleted";
import type { OnFieldUpdatedData } from "./onFieldUpdated";
import type { OnRecordAddedData } from "./onRecordAddedData";
import type { OnRecordDeleted } from "./onRecordDeleted";
import type { OnRecordUpdatedData } from "./onRecordUpdated";
import type { PaginationRecords } from "./paginationRecords";
import type { RecordPresenter } from "./recordPresenter";
import type { ViewPresenterItem } from "./viewPresenterItem";

/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface DataEngineData {
  id: string;
  views: Array<ViewPresenterItem>,
  records: {
    list: Array<RecordPresenter>,
    pagination: PaginationRecords
  }

  entityInformation: EntityPresenterItem;
  moduleConfiguration?: ModuleConfiguration;

  // UI
  // currentViewIdOpened?: string;
}

export interface DataEngineConfiguration extends DataEngineData {
  loadingFilter?: boolean;
  loadingSort?: boolean;
  loadingRecords?: boolean;
  loadingViewSection?: boolean;

  onRecordAdded?: (data: OnRecordAddedData) => void;
  onRecordUpdated?: (data: OnRecordUpdatedData) => void;
  onRecordDeleted?: (data: OnRecordDeleted) => void;

  onFieldAdded?: (data: OnFieldAddedData) => void;
  onFieldUpdated?: (data: OnFieldUpdatedData) => void;
  onFieldDeleted?: (data: OnFieldDeleteData) => void;
}
