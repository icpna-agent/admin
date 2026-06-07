import { Component, inject, signal, OnInit, viewChild, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AgentService } from '@service/agent.service';
import { ToastService } from '@service/toast.service';
import { PATH, buildPath } from '@route/path.route';
import { AgentForm } from '../../layout/agent-form/agent-form';

@Component({
  selector: 'app-agent-edit',
  imports: [CommonModule, AgentForm],
  templateUrl: './agent-edit.html',
})
export class AgentEdit implements OnInit {
  private router = inject(Router);
  private agentService = inject(AgentService);
  private toastService = inject(ToastService);

  id = input<string>();

  data = signal<any | null>(null);
  loading = signal(false);

  formComponent = viewChild<AgentForm>(AgentForm);

  ngOnInit() {
    if (this.id()) {
      this.loadData(+this.id()!);
    } else {
      this.onCancel();
    }
  }

  loadData(id: number) {
    this.loading.set(true);

    // Load bot data first
    this.agentService.findOneBot(id).then((bot: any) => {
      // Try to load the instance for this bot
      return this.agentService.listInstances({ botId: id, page: 1, limit: 1 }).then((instanceRes: any) => {
        const instances = instanceRes.data ? instanceRes.data : (Array.isArray(instanceRes) ? instanceRes : []);
        const instance = instances.length > 0 ? instances[0] : null;

        this.data.set({
          ...bot,
          instance,
        });
        this.loading.set(false);
      });
    }).catch(err => {
      this.toastService.error('Error al cargar el agente');
      this.onCancel();
    });
  }

  handleFormSubmit(formData: any) {
    this.loading.set(true);
    const botId = +this.id()!;

    // Update bot
    this.agentService.updateBot(botId, formData.bot).then(() => {
      // Check if instance exists
      const existing = this.data();
      if (existing?.instance?.id) {
        // Update existing instance
        return this.agentService.updateInstance(existing.instance.id, {
          ...formData.instance,
          bot_id: botId,
        });
      } else {
        // Create new instance
        return this.agentService.createInstance({
          ...formData.instance,
          bot_id: botId,
        });
      }
    }).then(() => {
      this.toastService.success('Agente actualizado exitosamente');
      this.onCancel();
    }).catch(error => {
      this.toastService.error(this.agentService.getErrorMessage(error));
      this.loading.set(false);
    });
  }

  onCancel() {
    const path = buildPath(PATH.admin.agent.list);
    this.router.navigate([path]);
  }
}
