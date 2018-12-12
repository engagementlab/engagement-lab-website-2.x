import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authorFormat'
})
export class AuthorFormatPipe implements PipeTransform {

  transform(value: string): any {

    if(typeof(value) !== 'string') return value;
    
    let and = value.replace(/and/g, '<br />');
    let comma = and.replace(/,/g, '<br />');
    return comma;
  }

}
