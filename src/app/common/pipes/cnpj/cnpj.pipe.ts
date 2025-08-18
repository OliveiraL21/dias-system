import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpj',
  standalone: true
})
export class CnpjPipe implements PipeTransform {

  transform(value: string | number): string {
    if (!value) return '';
    const cnpj = value.toString().replace(/\D/g, '');
    if (cnpj.length !== 14) return value.toString();
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }

}
