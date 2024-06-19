import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import * as XLSX from 'xlsx';
import { EditorModule } from 'primeng/editor';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';




@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FileUploadModule,ToastModule,HttpClientModule,TableModule,CommonModule,EditorModule,CardModule,FormsModule,ToggleButtonModule,CustomPipesPipe,PipesPipe
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  providers:[MessageService]
})
export class TableComponent implements OnInit {
  constructor(private messageService: MessageService) {

    
  }


  datafirst:any=[];
   codingvalue:any=[];
    x:any
  sidebarVisible: boolean = true;
  data1: any[]=[];
  arrayOfObjects2:any[]=[];
    display='table-view'
    viewtype=true;
    data12:any=[];
    ngOnInit() {

    
    }
  
    onUpload(event: any) {
      const file:DataTransfer = <DataTransfer>event.files[0];
    this.readExcelFile(file);
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }

  readExcelFile(file:any)
  {
    const reader = new FileReader();

  
    reader.onload = (e: any) => {
      const data = reader.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[1];
      const worksheet = workbook.Sheets[sheetName];
      this.data1 = XLSX.utils.sheet_to_json(worksheet,{header:1});
      this.distrucurevalue()

  
    };
    reader.readAsArrayBuffer(file);
   
  } 
  playVid(i:number) { 
    this.x = document.querySelectorAll('#video').forEach((value,index )=>
      {
       
           let val=value as HTMLVideoElement;
if(index==i)
  {
    val.play()
  }
          
      }) ; 

   } 
  
 
   pauseVid(i:number) { 
    this.x = document.querySelectorAll('#video').forEach((value,index )=>
      {
           
           let val=value as HTMLVideoElement;
if(index==i)
  {
    val.pause()
  }
          
      }) ; 

   } 
  distrucurevalue()
  {
    this.data12=this.data1.slice(1);
    const data=  this.data1.slice(1)
  
   this.arrayOfObjects2 = data.map(([SNo, heading, subheading, content, note, url, codeing , image, video]) => ({ SNo, heading, subheading, content, note, url, codeing , image, video}));
   this.arrayOfObjects2.filter((value)=>{
    if(value.codeing)
      {
        this.codingvalue.push(value.codeing)
      }
   })
   this.arrayOfObjects2.filter((value)=>
    {
      this.datafirst.push(value.heading)
    });
  }

  // retrievefiles()
  // {
  //   this.dataget=`<td>${this.data1[0].heading}}</td>  
  //   <td>${this.data1[0].subheading}}</td>
  //   <td>${this.data1[0].content}</td>
  //   <td>${this.data1[0].note}</td>
  //   <td>${this.data1[0].url}</td>
  //   <td>${this.data1[0].code}</td>
  //   <td>${this.data1[0].images}</td>
  //   <td>${this.data1[0].videos}</td>`
 
  // }
toggle()
{
  if(this.display=='table-view')
    {
      this.display='content-view'
   
    }
    else
    {
      
      this.display='table-view'
    }
}
// toggle1()
// {
//   if(this.viewtype=='excel-format')
//     {
//       this.viewtype='html-format';
//     }
//     else
//     {
//       this.viewtype='excel-format'
//     }
// }


color(i:number)
{
  const a= document.getElementById('side-nav') as HTMLAnchorElement
  // alert(document.getElementById('side-nav')?.innerHTML)
  document.getElementById('side-nav')?.innerHTML

  document.querySelectorAll('#itreate').forEach((Element,index)=>{
   
    if(i==index)
      {
         

        // alert(Element.innerHTML.)
      }
  })
}
  

   
}import { CustomPipesPipe } from '../pipes/custom-pipes.pipe';
import { PipesPipe } from '../pipes.pipe';

