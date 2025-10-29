import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  effect,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NetworkElement } from '../../services/info.service';

@Component({
  selector: 'app-element-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './element-form.component.html',
  styleUrls: ['./element-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementFormComponent {
  private fb = inject(FormBuilder);
  element = input<NetworkElement | null>(null);
  save = output<Partial<NetworkElement>>();
  cancel = output<void>();

  form = this.fb.nonNullable.group({
    hostname: ['', Validators.required],
    ip_address: ['', Validators.required],
    mac_address: ['', Validators.required],
    type: ['', Validators.required],
    manufacturer: ['', Validators.required],
    model: ['', Validators.required],
    status: ['', Validators.required],
    location: ['', Validators.required],
    last_seen: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      if (this.element()) {
        this.form.patchValue(this.element()!);
      }
    });
  }

  onSubmit() {
    this.save.emit(this.form.value);
  }

  onCancel() {
    this.cancel.emit();
  }
}
