import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { AlertController } from '@ionic/angular';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-element',
  templateUrl: './task-element.component.html',
  styleUrls: ['./task-element.component.scss'],
})
export class TaskElementComponent  implements OnInit {

  //addImport dekorator
  @Input() task: Task = {id:'t3', title: 'Seminarski iz Projektovanja softvera', description: 'Seminarski zavrsiti do kraja maja', imgUrl:'',userId:'xx'};

  constructor(private alertController:AlertController, private taskService:TasksService) { }

  ngOnInit() {}

  openAlert(event:{stopPropagation:()=>void; preventDefault:()=>void;}){
    event.stopPropagation();
    event.preventDefault();

        this.alertController.create({
          header:"Delete task",
          message:"Are you sure you want to delete this task?",
          buttons:[{
            text:"Delete",
            handler:()=>{
              this.taskService
            .deleteTask(this.task.id)
            .subscribe()
            }
          },{
            text:"Cancel",
            handler:()=>{
              console.log("Didn't delete it.");
            }
          }]
        }).then((alert:HTMLIonAlertElement)=>{
          alert.present();
        });
      }

     
    }


