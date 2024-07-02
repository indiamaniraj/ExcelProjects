import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import * as Xlx from 'xlsx';
import { CustomPipes2Pipe } from '../pipes/custom-pipes2.pipe';
import { CheckboxModule } from 'primeng/checkbox';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LeftSlideComponent } from '../left-slide/left-slide.component';
import { QuestionComponent } from '../question/question.component';
import { AppserviceServiceService } from '../appservice.service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-excel-project',
  standalone: true,
  templateUrl: './excel-project.component.html',
  styleUrl: './excel-project.component.css',
  providers: [MessageService, AppserviceServiceService],
  imports: [
    FileUploadModule,
    ToastModule,
    CommonModule,
    HttpClientModule,
    CustomPipes2Pipe,
    CheckboxModule,
    FormsModule,
    RadioButtonModule,
    PaginatorModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    LeftSlideComponent,
    QuestionComponent,
  ],
})
export class ExcelProjectComponent implements OnInit, AfterContentChecked {
  constructor(
    private messageService: MessageService,
    private appservice: AppserviceServiceService
  ) {
    this.FormGroup1 = new FormGroup({
      text: new FormControl('', [Validators.required, Validators.email]),
    });
    console.log(this.FormGroup1);
    this.subscripition = new Subscription();
    // this.appservice.subject2.subscribe((value) => {
    //   debugger;
    //   console.log(value);
    //   this.event = value;
    //   console.log(this.event);
    //   if (this.event.length) {
    //     this.getdata();
    //   }
    // });
  }
  ngAfterContentChecked(): void {
    this.subscripition = this.appservice.subjectobservable2.subscribe(
      (response: any) => {
        console.log(response);
        this.event = response;

        // Perform actions that depend on this.event here
        if (this.event?.length) {
          debugger;
          // this.getdata();
        }
      }
    );
  }

  ngOnInit(): void {
    this.subscripition = this.appservice.subjectobservable2.subscribe(
      (response: any) => {
        console.log(response);
        this.event = response;

        // Perform actions that depend on this.event here
        if (this.event?.length) {
          debugger;
          // this.getdata();
        }
      }
    );
  }
  event: any;
  chidvalue: any = [];
  datasend: any = [];
  datatransfer: any[] = [];
  first: number = 0;
  page: number = 0;
  pagecount: number = 0;
  loaded: boolean = false;
  rows: number = 1;
  addnewarray: any = [];
  newarray: any = [];
  visible: boolean = false;
  FormGroup1!: FormGroup;
  subscripition: Subscription;
  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.page = event.page;
    this.pagecount = event.pageCount;
  }
  onPageChange1() {
    this.first = 0;
    this.rows = 2;
  }

  getdata(data23: any) {
    console.log(data23);

    this.event = data23[0];
    console.log(this.event);
    let filter = this.event.option.toLowerCase() as string;
    let text = this.event.text;

    console.log(filter);
    console.log(text);
    const data = Object.keys(this.arrayoflist[0]);
    console.log(data);
    let filterarrary: any[] = [];
    this.arrayoflist.filter((value: any) => {
      if (filter === 'options') {
        let flag: Boolean = true;
        value[filter].forEach((value1: any) => {
          if (value1.value.includes(text) && flag) {
            alert('hi');
            console.log(value);
            filterarrary.push(value);
            flag = false;
          }
        });
      } else if (value[filter].includes(text)) {
        filterarrary.push(value);
      }
    });

    this.arrayoflist = filterarrary;
    if (this.arrayoflist.length == 0) {
      alert('There is no data you looking for is not available');
      this.destructivefile();
    }
  }

  scroll(i: any) {
    console.log(i);
    if (document.getElementById(i) == null) {
      alert('please change the pagination setting at the bottom');
    } else {
      document.getElementById(i)!.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  }
  showquestion: number = 0;
  data1: any[] = [];
  arrayoflist: any = [];
  sheetname: string = '';
  options: string[] = [];

  onUpload(event: any) {
    const file: DataTransfer = <DataTransfer>event.files[0];
    this.readexecelfile(file);
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Basic Mode',
    });
  }

  reload() {
    this.destructivefile();
    let getdata: any = [];
    this.appservice.subject.subscribe((value) => {
      getdata = value;
    });
    console.log(getdata);
  }
  readexecelfile(file: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = reader.result;
      const workbook = Xlx.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[2];
      this.sheetname = sheetName;
      const worksheet = workbook.Sheets[sheetName];
      this.data1 = Xlx.utils.sheet_to_json(worksheet, { header: 1 });
      this.destructivefile();
    };
    reader.readAsArrayBuffer(file);
  }

  destructivefile() {
    const data = this.data1.slice(1);
    this.arrayoflist = data.map(
      ([
        SNO,
        questions,
        optionsstyle,
        options,
        answers,
        explanations,
        Answerbutton,
        status,
        selected,
      ]) => ({
        SNO,
        questions,
        optionsstyle,
        options,
        answers,
        explanations,
        Answerbutton,
        showanswer: false,
        status,
        selected,
      })
    );
    this.arrayoflist.forEach((Element: any) => {
      const a: string[] = Element.options.split(',');
      const c: Object[] = [];
      for (let i = 0; i < a.length; i++) {
        c[i] = {
          value: a[i],
          isselcted: false,
        };
      }
      Element.options = c;
    });

    this.loaded = true;
    this.onPageChange1();
  }

  showanswer(value: any) {
    // this.destructivefile();

    console.log(value);
    if (this.arrayoflist[value].showanswer) {
      this.arrayoflist[value].showanswer = false;
    } else {
      this.arrayoflist[value].showanswer = true;
    }

    if (
      this.arrayoflist[value].answers.toString() ==
      this.arrayoflist[value].selected
    ) {
      this.arrayoflist[value].status = 'Correct Answer';
      this.arrayoflist[value].selected;
    } else {
      this.arrayoflist[value].status = 'Wrong Answer';
    }
  }

  showDialog() {
    this.visible = true;
  }
  exportdata() {
    this.visible = false;

    let selectedanswer = '';
    let options: any = [];
    this.arrayoflist.forEach((value: any, index: number) => {
      options[index] = '';
      value.options.forEach((value1: any, index1: any) => {
        if (value1.isselcted == true) {
          selectedanswer = value1.value;
        }
        if (value.options.length > index1) {
          if (index1 == 3) {
            options[index] += value1.value;
          } else {
            options[index] += value1.value + ',';
          }
        }
      });

      this.datasend[index] = {
        'S.No': value.SNO,
        Questions: value.questions,
        Options: options[index],
        selectedanswer: selectedanswer,
        Answer: value.answers,
      };
    });

    this.datatransfer = this.datasend;
    console.log(this.datatransfer);
    console.log(this.datasend);
    let email: string = this.FormGroup1.get('text')?.value;
    console.log(email);
    let b: string[] = email.split('@');

    console.log(b[0]);

    const ws: Xlx.WorkSheet = Xlx.utils.json_to_sheet(this.datasend);

    // Create a workbook and add the worksheet
    const wb: Xlx.WorkBook = Xlx.utils.book_new();
    Xlx.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Export the Excel file
    Xlx.writeFile(wb, b[0] + '.xlsx');

    console.log('Excel file generated successfully');
  }

  chooseoption(value: any) {
    console.log('Value====>', value);
    this.arrayoflist.forEach((value1: any, index: number) => {
      if (value == value1.SNO) {
        console.log(index);
        value1.options.forEach((check: any) => {
          console.log(check);
          if (check.value == value1.selected) {
            check.isselcted = true;
          } else {
            check.isselcted = false;
          }
        });
      }
    });
    console.log(this.arrayoflist[value - 1].options);
  }
}

//console.log(data23);

// this.event = data23[0];
// console.log(this.event[0]);
// let filter = this.event[0].option.toLowerCase() as string;
// let text = this.event[0].text;

// console.log(filter);
// console.log(text);
// const data = Object.keys(this.arrayoflist[0]);
// console.log(data);
// let filterarrary: any[] = [];
// this.arrayoflist.filter((value: any) => {
//   if (filter === 'options') {
//     let flag: Boolean = true;
//     value[filter].forEach((value1: any) => {
//       if (value1.value.includes(text) && flag) {
//         alert('hi');
//         console.log(value);
//         filterarrary.push(value);
//         flag = false;
//       }
//     });
//   } else if (value[filter].includes(text)) {
//     filterarrary.push(value);
//   }
// });

// this.arrayoflist = filterarrary;
// if (this.arrayoflist.length == 0) {
//   alert('There is no data you looking for is not available');
//   this.destructivefile();
// }***//**
