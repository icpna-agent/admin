import { Injectable, inject } from '@angular/core';
import { Api, ApiBody, BotResultDto, InstanceResultDto } from 'api/backend.api';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private api = inject(Api);

  // --- BOT (Agent) ---

  listBots(query: Record<string, any> = {}) {
    return this.api.agent.findAllBots(query as any).then((res) => res.data);
  }

  findOneBot(id: number) {
    return this.api.agent.findOneBot({ id }).then((res) => res.data);
  }

  createBot(data: ApiBody<'agent', 'createBot'>) {
    return this.api.agent.createBot(data).then((res) => res.data);
  }

  updateBot(id: number, data: ApiBody<'agent', 'updateBot'>) {
    return this.api.agent.updateBot({ id }, data).then((res) => res.data);
  }

  deleteBot(id: number) {
    return this.api.agent.deleteBot({ id }).then((res) => res.data);
  }

  // --- INSTANCE ---

  listInstances(query: Record<string, any> = {}) {
    return this.api.agent.findAllInstances(query as any).then((res) => res.data);
  }

  findOneInstance(id: number) {
    return this.api.agent.findOneInstance({ id }).then((res) => res.data);
  }

  createInstance(data: ApiBody<'agent', 'createInstance'>) {
    return this.api.agent.createInstance(data).then((res) => res.data);
  }

  updateInstance(id: number, data: ApiBody<'agent', 'updateInstance'>) {
    return this.api.agent.updateInstance({ id }, data).then((res) => res.data);
  }

  deleteInstance(id: number) {
    return this.api.agent.deleteInstance({ id }).then((res) => res.data);
  }

  getErrorMessage(error: unknown): string {
    const apiError = error as { error?: { message?: string | string[] }; message?: string };
    const message = apiError.error?.message || apiError.message || 'Ocurrio un error inesperado';
    return Array.isArray(message) ? message[0] : message;
  }
}
