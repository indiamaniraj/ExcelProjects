import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppserviceServiceService } from '../appservice.service.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
})
export class QuestionComponent {
  constructor(private service: AppserviceServiceService) {}
  @Input()
  arraylist: any = [];
  @Output() data: EventEmitter<any> = new EventEmitter();
  data1: any = [];
  senddata(number: number) {
    console.log(number);
    this.data.emit(number);
    this.service.subject.subscribe((value) => {
      this.data1 = value;
    });
    console.log(this.data1);
    this.service;
  }
}
