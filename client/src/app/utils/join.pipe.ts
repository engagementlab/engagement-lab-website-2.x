import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'join',
})
export class JoinPipe implements PipeTransform {
    transform(value: string[], char: string): string {
        return value.join(char);
    }
}
