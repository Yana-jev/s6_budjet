   import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';

   export function requireCheckboxesToBeCheckedValidator(minRequired = 1): ValidatorFn {
   return function validate(formGroup: AbstractControl): { [key: string]: boolean } | null {

      if (!(formGroup instanceof FormGroup)) {
         return null; 
      }

      let checked = 0;

      Object.keys(formGroup.controls).forEach(key => {
         const control = formGroup.get(key);

         if (control && control.value === true) {
         checked++;
         }
      });

      if (checked < minRequired) {
         return {
         requireOneCheckboxToBeChecked: true,
         };
      }

      return null;
   };
   }
