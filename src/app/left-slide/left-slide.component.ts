import { Component, OnInit, ViewChild } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppserviceServiceService } from '../appservice.service.service';
import { ExcelProjectComponent } from '../excel-project/excel-project.component';

@Component({
  selector: 'app-left-slide',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    DropdownModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  providers: [AppserviceServiceService],
  templateUrl: './left-slide.component.html',
  styleUrl: './left-slide.component.css',
})
export class LeftSlideComponent implements OnInit {
  constructor(
    private service: AppserviceServiceService,
    private getdata: ExcelProjectComponent
  ) {}

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  data: any = [];

  datatransfer: any = [];
  closeCallback(e: any): void {
    this.sidebarRef.close(e);
    this.selectedCity1.controls.forEach((form: any, index: number) => {
      // Access the 'text' control value for each form group
      const textValue = form.get('text').value;
      console.log('Text value:', textValue);
      console.log(this.selectedCity1.controls.length);

      this.datatransfer[this.selectedCity1.controls.length - 1] = {
        option: this.dropdownvalue,
        text: textValue,
      };
    });
    this.getdata.getdata(this.datatransfer);
    this.senddata();
  }

  showbutton() {}

  senddata() {
    this.service.receviedata1(this.datatransfer);
  }
  sidebarVisible: boolean = false;

  selectedvalue: String = '';
  cities: any = [];

  // private filterDataSubscription: Subscription;
  formGroup!: FormGroup;
  dropdownvalue: string = '';
  item!: FormArray;
  formGroup1!: FormGroup;

  ngOnInit(): void {
    this.service.subjectobservable.subscribe((data1) => {
      this.data = data1;
      console.log('Excel data received:', this.data);
      // Perform operations with excelData as needed
    });
    console.log(this.data);
    this.service.subject.next(this.getdata.arrayoflist);
    // this.service.subjectobservable.subscribe((data1) => {
    //   this.data = data1;
    //   console.log('Excel data received:', this.data);
    //   // Perform operations with excelData as needed
    // });
    // this.service.subject.subscribe((value) => {
    //   this.data = value;
    // });
    // debugger;
    // this.data = this.service.receviceleft();
    // console.log(this.data);
    // console.log(this.data);
    if (this.data.length) {
      const data2 = Object.keys(this.data[0]);
      console.log(data2);
      data2.forEach((value: string, index: any) => {
        this.cities[index] = {
          name: value,
        };
      });
    }

    console.log(this.cities);
    this.formGroup = new FormGroup({
      selectedCity: new FormControl(''),
    });
    this.formGroup1 = new FormGroup({
      selectedCity1: new FormArray([this.growrow()]),
    });

    console.log(this.formGroup);

    console.log(this.formGroup1);
  }
  onChange(event: any) {
    this.service.subject.subscribe((value) => {
      this.data = value;
    });
    console.log(this.data);
    console.log(event.value.name);
    this.dropdownvalue = event.value.name;
  }
  get selectedCity1() {
    return this.formGroup1.get('selectedCity1') as FormArray;
  }
  Addnewrow() {
    this.item = this.formGroup1.get('selectedCity1') as FormArray;
    this.item.push(this.growrow());
  }

  removerow(i: number) {
    this.item = this.formGroup1.get('selectedCity1') as FormArray;
    this.item.removeAt(i);
  }
  growrow(): FormGroup {
    return new FormGroup({
      selectedCity: new FormControl(),
      text: new FormControl('', [Validators.required]),
    });
  }
}
