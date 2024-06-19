import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload-component',
  standalone: true,
  imports: [FileUploadModule,ToastModule,HttpClientModule,TableModule,CommonModule],
  templateUrl: './upload-component.component.html',
  styleUrl: './upload-component.component.css',
  providers: [MessageService]
})
export class UploadComponentComponent {
  constructor(private messageService: MessageService) {

    
    
  }
 
  data1: any[] = [];

  arrayBuffer:any;
  file!:File;
  filelist:any;
    onUpload(event: any) {
      const file = event.files[0];
    console.log('Uploaded File:', file);
    this.readExcelFile(file);
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }

  readExcelFile(file:any)
  {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e: any) => {
      const data = new Uint8Array(reader.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      console.log(sheetName)
      const worksheet = workbook.Sheets[sheetName];
      console.log(worksheet)
      this.data1 = XLSX.utils.sheet_to_json(worksheet);
      console.log(this.data1)
    
    };

  }  
}
