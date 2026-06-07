import { Component, inject, input, output, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgentService } from '@service/agent.service';

@Component({
  selector: 'app-agent-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agent-form.html',
})
export class AgentForm {
  models: ('gpt' | 'gemini')[] = ['gpt', 'gemini'];
  whatsappTypes: string[] = ['business'];
  providerTypes: string[] = ['meta'];

  private fb = inject(FormBuilder);
  private agentService = inject(AgentService);

  data = input<any | null>(null);
  editMode = input<boolean>(false);
  onSubmitForm = output<any>();

  bots = signal<any[]>([]);
  loadingBots = signal(false);

  botForm: FormGroup = this.fb.group({
    phone: ['', [Validators.required]],
    name: ['', [Validators.required]],
    prompt: ['', [Validators.required]],
    model: ['gpt', [Validators.required]],
  });

  instanceForm: FormGroup = this.fb.group({
    bot_id: [null],
    whatsapp_type: ['business', [Validators.required]],
    provider_type: ['meta', [Validators.required]],
    business_id: ['', [Validators.required]],
    phone_number_id: ['', [Validators.required]],
    display_phone_number: ['', [Validators.required]],
    waba_id: ['', [Validators.required]],
    token: ['', [Validators.required]],
  });

  constructor() {
    effect(() => {
      const existing = this.data();
      if (this.editMode() && existing) {
        // Patch bot form
        this.botForm.patchValue({
          phone: existing.phone || '',
          name: existing.name || '',
          prompt: existing.prompt || '',
          model: existing.model || 'gpt',
        });

        // Patch instance form if instance data exists
        if (existing.instance) {
          this.instanceForm.patchValue({
            bot_id: existing.id,
            whatsapp_type: existing.instance.whatsapp_type || 'business',
            provider_type: existing.instance.provider_type || 'meta',
            business_id: existing.instance.business_id || '',
            phone_number_id: existing.instance.phone_number_id || '',
            display_phone_number: existing.instance.display_phone_number || '',
            waba_id: existing.instance.waba_id || '',
            token: existing.instance.token || '',
          });
        }
      } else {
        this.botForm.reset({ model: 'gpt' });
        this.instanceForm.reset({
          whatsapp_type: 'business',
          provider_type: 'meta',
        });
      }
    });

    // Load bots for the instance form dropdown (only needed for creating instances standalone)
    this.loadBots();
  }

  loadBots() {
    this.loadingBots.set(true);
    this.agentService
      .listBots({ page: 1, limit: 100 })
      .then((res: any) => {
        this.bots.set(res.data ? res.data : Array.isArray(res) ? res : []);
      })
      .catch(() => this.bots.set([]))
      .finally(() => this.loadingBots.set(false));
  }

  submitForm() {
    if (this.botForm.invalid) {
      this.botForm.markAllAsTouched();
      return;
    }
    if (this.instanceForm.invalid) {
      this.instanceForm.markAllAsTouched();
      return;
    }

    const botData = { ...this.botForm.value };
    const instanceData = { ...this.instanceForm.value };

    this.onSubmitForm.emit({
      bot: botData,
      instance: instanceData,
    });
  }
}
