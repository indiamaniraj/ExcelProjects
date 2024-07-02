import { Injectable } from '@angular/core';
import {
  AsyncSubject,
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
} from 'rxjs';
import { ExcelProjectComponent } from './excel-project/excel-project.component';

@Injectable({
  providedIn: 'root',
})
export class AppserviceServiceService {
  subject = new ReplaySubject<any>(1);

  subjectobservable = this.subject.asObservable();
  // exceldata$: Observable<any> = this.subject.asObservable();

  subject2 = new Subject<any>();
  subjectobservable2 = this.subject.asObservable();
  data: any = [];
  excell: ExcelProjectComponent | undefined;
  // filterdata$: Observable<any> = this.subject2.asObservable();
  constructor() {}

  setexceldata(data: any) {
    this.subject.next(data);
  }

  receviceleft() {
    return this.subject.subscribe((value: any) => {
      console.log(value);
    });
  }

  receviedata1(data: any) {
    console.log(data);
    this.excell?.getdata(data);
    this.subject2.next(data);
  }
}
