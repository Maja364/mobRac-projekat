import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';
import { ModalController } from '@ionic/angular';
import { TaskModalComponent } from '../task-modal/task-modal.component';


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

  tasks: Task[];

  constructor(private tasksService: TasksService,private taskController: ModalController ) {
    console.log('constructor');
    this.tasks = this.tasksService.tasks;
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
          console.log(res);
        });
      }
    });
  }
  

  ngOnInit() {
    this.tasksService.getTasks().subscribe((tasksData)=>{
      console.log(tasksData);
      const tasks:Task[]=[];

      for(const key in tasksData){
        if(tasksData.hasOwnProperty(key)){
          tasks.push({
            id:key,
            title: tasksData[key].title,
            description: tasksData[key].description,
            imgUrl:'https://png.pngtree.com/png-clipart/20190117/ourmid/pngtree-hand-painted-teachers-day-a-stack-of-books-book-png-image_432486.jpg',
          });
        }
      }
      this.tasks=tasks;
    });
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

}
