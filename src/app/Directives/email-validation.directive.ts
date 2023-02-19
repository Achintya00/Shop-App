import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appEmailValidation]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidationDirective,
      multi: true,
    },
  ],
})
export class EmailValidationDirective implements Validator {
  count = 0;
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const value = (control.value as string) || undefined;

    if (!value?.includes('@') || !value?.includes('.com')) {
      return {
        invalidEmail: true,
      };
    }
    return null;
  }
  constructor() {}
}
