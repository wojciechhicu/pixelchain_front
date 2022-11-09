import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Check if control value is lower than value
 * @param value number to check
 * @returns object if error exist; null if its correct
 */
export function minValue(value: number): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		return control.value < value ? { minValue: true } : null;
	};
}

/**
 * Check if wallet address is correct by checking length > 130 of wallet address 
 * and first 2 characters starts with '04'
 * @returns object if its incorrect and null if its correct
 */
export function check04(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		if(control.value.length < 130){
			return {start: true}
		} else if(control.value.slice(0, 2) != '04'){
			return { start: true}
		} else {
			return null
		}
	};
}
