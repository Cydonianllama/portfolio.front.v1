/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import { entityDTO } from "@/api/dataEngine/entity";

type AppEvents = {
    entityCreated: entityDTO;
};

export class EventBus {

  private listeners = new Map<keyof AppEvents, Set<Function>>();

  on(event: keyof AppEvents, listener: Function) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(listener);
  }

  emit(event: keyof AppEvents, payload?: any) {
    const listeners = this.listeners.get(event);
    if (!listeners) return;
    listeners.forEach(listener => listener(payload));
  }

  off(event: keyof AppEvents, listener: Function) {
    this.listeners.get(event)?.delete(listener);
  }

}

export const eventBus = new EventBus()