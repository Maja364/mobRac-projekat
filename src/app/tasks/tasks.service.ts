import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';

interface TaskData{
  title:string;
  description:string;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private _tasks=new BehaviorSubject<Task[]>([]);

  oldTasks: Task[] = [
    {id: 't1', title: 'Projekat iz Mobilnog racunarstva', description: 'Projekat zavrsiti do 1. juna', imgUrl: 'https://i.pinimg.com/736x/ac/c2/9e/acc29eb7588b23d2cf548e32eff5ce9c.jpg'},
    {id: 't2', title: 'Kolokvijum iz Projektovanja softvera', description: 'Kolokvijum spremiti do petka', imgUrl: 'https://i.pinimg.com/564x/bc/89/7c/bc897c914c753731b1ac2060f784b836.jpg'}
  ];

  constructor(private http:HttpClient) { }

  get tasks(){
    return this._tasks.asObservable();
  }

  addTask(title:string, description:string){
    let generatedId: string;
    return this.http.post<{name:string}>('https://task-app-96268-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',{
      title,
      description
    }).pipe(switchMap((resData)=>{
      generatedId=resData.name;
      return this.tasks;
      
    }),
    take(1),
    tap((tasks)=>{
      this._tasks.next(tasks.concat({
        id:generatedId,
        title,
        description,
        imgUrl:'https://i.pinimg.com/564x/bc/89/7c/bc897c914c753731b1ac2060f784b836.jpg'
      }));

    }));
  }

  getTasks(){
    return this.http.get<{[key:string]:TaskData}>('https://task-app-96268-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')
    .pipe(map((tasksData)=>{
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

      this._tasks.next(tasks);
      return tasks;
    }),
    tap(tasks=>{
      this._tasks.next(tasks);
    })
    );
  }
  getTask(id: string){
    return this.oldTasks.find((t) => t.id === id);
  }
}
