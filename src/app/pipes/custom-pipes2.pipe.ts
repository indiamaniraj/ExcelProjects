import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipes2',
  standalone: true
})
export class CustomPipes2Pipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    let value2:string[]=value.split(",")
    if(value2.length>0)
      {
        console.log(value2)
      }
    return null;
  }
  
   



}
