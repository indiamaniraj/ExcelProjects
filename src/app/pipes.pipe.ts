import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipes',
  standalone: true
})
export class PipesPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let value1=''
    if(value.length>10)
      {
        if(value.startsWith('<img'))
          {    
         const a:string[]=value.split(' ')  
         const b:string[]=a[2].substring(4).split('"')
         console.log(b[1])
      
        
           return b[1];
         
          }
         value1=value.substring(0,14)
         value1=value1.concat('......................................................')
         return value1;
      }
     
    return value;
  }

}
