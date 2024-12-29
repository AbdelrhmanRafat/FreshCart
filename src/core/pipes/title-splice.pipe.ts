import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleSplice',
  standalone: true
})
export class TitleSplicePipe implements PipeTransform {

  transform(title: string): string {
    if(title.split(' ').length >= 5){
      return title.split(' ').slice(0, 5).join(" ") + "...";
    }
    return title;
  }

}
