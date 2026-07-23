import type { IPlatformAdapter } from "../adapters/platform.adapter.js";
import { ConversationPlaform } from "../models/platform.enum.js";

export interface IPlatformAdapterFactory {
  create(platform: ConversationPlaform): IPlatformAdapter;
}