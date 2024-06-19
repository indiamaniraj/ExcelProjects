import { Component, OnInit, ViewChild } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { DropdownModule } from 'primeng/dropdown';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-componenet1',
  standalone: true,
  imports: [SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule,DropdownModule,ReactiveFormsModule,CommonModule],
  templateUrl: './componenet1.component.html',
  styleUrl: './componenet1.component.css'
})
export class Componenet1Component implements OnInit {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e:any): void {
      this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;

  cities: City[] | undefined;
    
  formGroup!: FormGroup ;


  item !:FormArray
  formGroup1!:FormGroup
  ngOnInit() {
      this.cities = [
          { name: 'New York', code: 'NY' },
          { name: 'Rome', code: 'RM' },
          { name: 'London', code: 'LDN' },
          { name: 'Istanbul', code: 'IST' },
          { name: 'Paris', code: 'PRS' }
      ];

      this.formGroup = new FormGroup({
          selectedCity: new FormControl<City | null>(null)
      });
      this.formGroup1=new FormGroup({
        selectedCity1: new FormArray([this.growrow()])
      });
  }
 
  get selectedCity1(){
    return this.formGroup1.get("selectedCity1") as FormArray;
  }
  Addnewrow()
  {
    this.item=this.formGroup1.get('selectedCity1') as FormArray;
    this.item.push(this.growrow())

  }

  removerow(i:number)
  {
    this.item=this.formGroup1.get('selectedCity1') as FormArray;
    this.item.removeAt(i);
  }
  growrow():FormGroup
  {
    return new FormGroup({
      selectedCity: new FormControl(),
      text:new FormControl('')
    })
  }
}
