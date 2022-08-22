import { AbstractControl, ValidatorFn } from '@angular/forms';

export function customValidator(regexp: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const check = regexp.test(control.value);
    return check ? { nameNotMatch: { value: control.value } } : null;
  };
}
export function passValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const pass = control.get('password');
  const confpass = control.get('confirmPass');
  if ((pass && pass.pristine) || (confpass && confpass.pristine)) {
    return null;
  }
  return pass && confpass && pass.value !== confpass.value
    ? { misMatch: true }
    : null;
}
