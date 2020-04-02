import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'authorFormat',
})
export class AuthorFormatPipe implements PipeTransform {
    transform(value: string): any {
        if (typeof value !== 'string') return value;

        const and = value.replace(/and/g, '<br />');
        const comma = and.replace(/,/g, '<br />');
        return comma;
    }
}
