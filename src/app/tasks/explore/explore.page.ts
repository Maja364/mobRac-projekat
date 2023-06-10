import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';
import { ModalController } from '@ionic/angular';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit, OnDestroy {

 /*  tasks: Task[] = [
    {id: 't1', title: 'Projekat iz Mobilnog racunarstva', description: 'Projekat zavrsiti do 1. juna', imgUrl: 'https://i.pinimg.com/736x/ac/c2/9e/acc29eb7588b23d2cf548e32eff5ce9c.jpg'},
    {id: 't2', title: 'Kolokvijum iz Projektovanja softvera', description: 'Kolokvijum spremiti do petka', imgUrl: 'https://i.pinimg.com/564x/bc/89/7c/bc897c914c753731b1ac2060f784b836.jpg'}
  ]; */

  tasks!: Task[];
  private taskSub!:Subscription;
  public searchTerm:any='';


  constructor(private tasksService: TasksService,private taskController: ModalController ) {
    console.log('constructor');
    // this.tasks = this.tasksService.task;
  }
  openModal(){
    this.taskController.create({
      component:TaskModalComponent,
      componentProps:{title:'Add task'}
    }).then((modal:HTMLIonModalElement)=>{
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData)=>{
      if(resultData.role==='confirm'){
        console.log(resultData);
        this.tasksService.addTask(resultData.data.taskData.title,resultData.data.taskData.description).subscribe((res)=>{
          // this.tasks=this.tasks;
        });
      }
    });
  }
  

  ngOnInit() {
    this.taskSub=this.tasksService.tasks.subscribe((tasks)=>{
      this.tasks=tasks;
    });
  }

  ionViewWillEnter() {
    this.tasksService.getTasks().subscribe((tasks)=>{
      // this.tasks=tasks;
    });
  }

  // ionViewDidEnter() {
  //   console.log('ionViewDidEnter');
  // }

  // ionViewWillLeave() {
  //   console.log('ionViewWillLeave');
  // }

  // ionViewDidLeave() {
  //   console.log('ionViewDidLeave');
  // }

  ngOnDestroy() {
    if(this.taskSub){
      this.taskSub.unsubscribe();
    }
  }

}
