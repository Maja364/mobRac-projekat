import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
  standalone:true,
  imports: [IonicModule,CommonModule,FormsModule,RouterModule]
})

export class TaskModalComponent  implements OnInit {

  @ViewChild('f',{static:true}) form!: NgForm;
  @Input() title!:string;

  constructor(private modalCtrl:ModalController) { }

  onCancel(){
    this.modalCtrl.dismiss();
  }
  onAddTask(){
    if(!this.form.valid){
      return;
    }
    this.modalCtrl.dismiss({taskData:{title:this.form.value['title'],description:this.form.value['text']}},'confirm');
  }

  ngOnInit() {}

}
