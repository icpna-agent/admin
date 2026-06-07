import { Component, signal, inject, OnInit, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AgentService } from '@service/agent.service';
import { ToastService } from '@service/toast.service';
import { AlertService } from '@service/alert.service';
import { PATH, buildPath } from '@route/path.route';
import { ModalForm } from '../../../../components/modal-form/modal-form';
import { AgentForm } from '../../layout/agent-form/agent-form';

@Component({
  selector: 'app-agent-list',
  imports: [CommonModule, ModalForm, AgentForm],
  templateUrl: './agent-list.html',
})
export class AgentList implements OnInit {
  private agentService = inject(AgentService);
  private toastService = inject(ToastService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  items = signal<any[]>([]);
  loading = signal(false);
  showModal = signal(false);
  searchQuery = signal('');
  private searchTimeout: any;

  formComponent = viewChild<AgentForm>(AgentForm);

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.loading.set(true);
    const query: any = { page: 1, limit: 100 };
    if (this.searchQuery()) {
      query.search = this.searchQuery();
    }

    this.agentService.listBots(query).then((res: any) => {
      this.items.set(res.data ? res.data : (Array.isArray(res) ? res : []));
      this.loading.set(false);
    }).catch(err => {
      this.toastService.error('Error al cargar agentes');
      this.loading.set(false);
    });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => this.loadItems(), 400);
  }

  openCreateModal() { this.showModal.set(true); }
  closeModal() { this.showModal.set(false); }

  navigateToEdit(id: number) {
    const path = buildPath(PATH.admin.agent.edit).replace(':id', id.toString());
    this.router.navigate([path]);
  }

  handleModalSubmit() {
    this.formComponent()?.submitForm();
  }

  handleFormSubmit(data: any) {
    this.loading.set(true);

    // First create the bot, then create the instance linked to it
    this.agentService.createBot(data.bot).then((bot: any) => {
      const instanceData = {
        ...data.instance,
        bot_id: bot.id,
      };
      return this.agentService.createInstance(instanceData).then(() => {
        this.toastService.success('Agente e instancia creados exitosamente');
        this.loadItems();
        this.closeModal();
      });
    }).catch(err => {
      this.toastService.error(this.agentService.getErrorMessage(err));
      this.loading.set(false);
    });
  }

  deleteItem(id: number) {
    this.alertService.delete('Eliminar Agente', '¿Estás seguro? Se eliminará el agente y sus instancias.', () => {
      this.loading.set(true);
      this.agentService.deleteBot(id).then(() => {
        this.toastService.success('Agente eliminado');
        this.loadItems();
      }).catch(err => {
        this.toastService.error(this.agentService.getErrorMessage(err));
        this.loading.set(false);
      });
    });
  }
}
