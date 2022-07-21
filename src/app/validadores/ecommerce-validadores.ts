import {
  FormControl,
  ValidationErrors,
} from '@angular/forms';

export class EcommerceValidadores {
  static espacoEmBranco(control: FormControl): ValidationErrors | null {
    if (control.value != null && (control.value.trim().length === 0)) {
      return { 'espacoEmBranco': true };
    } else {

      return null;

    }
  }
}
