import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function accountValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const account = new String(value).length == 13;
    return !account ? { length: true } : null;
  };
}
