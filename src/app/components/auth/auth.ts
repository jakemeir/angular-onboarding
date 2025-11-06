import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private usernameAsyncValidator = this.authService.usernameAvailableValidator();
  private passwordMinLengthValidator = Validators.minLength(8);

  isLogin = signal<boolean>(true);
  form = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    const obs = this.isLogin()
      ? this.authService.login({
          ...this.form.value,
        })
      : this.authService
          .singUp({
            ...this.form.value,
          })
          .pipe(takeUntilDestroyed(this.destroyRef));

    obs.subscribe(() => this.router.navigate(['/']));
  }

  onToggle() {
    this.isLogin.update((pv) => !pv);

    if (!this.isLogin()) {
      this.form.controls.username.addAsyncValidators(this.usernameAsyncValidator);
      this.form.controls.password.addValidators(this.passwordMinLengthValidator);
    } else {
      this.form.controls.username.removeAsyncValidators(this.usernameAsyncValidator);
      this.form.controls.password.removeValidators(this.passwordMinLengthValidator);
    }

    this.form.controls.username.updateValueAndValidity();
    this.form.controls.password.updateValueAndValidity();
  }
}
