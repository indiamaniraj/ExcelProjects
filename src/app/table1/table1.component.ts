import { Component, OnInit, ViewChild } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-table1',
  standalone: true,
  imports: [SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule],
  templateUrl: './table1.component.html',
  styleUrl: './table1.component.css'
})
export class Table1Component implements OnInit {

  x:any
constructor()
{
  
}
  ngOnInit() {
    this.x = document.getElementById("myVideo") as HTMLVideoElement ; 
  }


  playVid() { 
   this.x.play(); 
  } 
  
  pauseVid() { 
    this.x.pause(); 
  } 
}

