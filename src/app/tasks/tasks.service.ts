import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

interface TaskData{
  title:string;
  description:string;
  imgUrl:string;
  userId:string;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private _tasks=new BehaviorSubject<Task[]>([]);

  oldTasks: Task[] = [
    {id: 't1', title: 'Projekat iz Mobilnog racunarstva', description: 'Projekat zavrsiti do 1. juna', imgUrl: 'https://i.pinimg.com/736x/ac/c2/9e/acc29eb7588b23d2cf548e32eff5ce9c.jpg',userId:'xx'},
  ];

  constructor(private http:HttpClient, private authService:AuthService) { }

  get tasks(){
    return this._tasks.asObservable();
  }

  addTask(title:string, description:string){
    let generatedId: string;
    let newTask:Task;
    let fetchedUserId:string;

    return this.authService.userId.pipe(
      take(1),
      switchMap(userId=>{
        fetchedUserId!=userId;
        return this.authService.token;
       
      }),
      
      take(1),
      switchMap((token)=>{
        newTask=new Task(
          null!, 
          title, 
          description, 
          'https://i.pinimg.com/564x/bc/89/7c/bc897c914c753731b1ac2060f784b836.jpg',
          fetchedUserId
          );
          return this.http.post<{name:string}>(
            `https://task-app-96268-default-rtdb.europe-west1.firebasedatabase.app/tasks.json?auth=${token}`,newTask );

      }),
      take(1),
      switchMap((resData)=>{
        generatedId=resData.name;
        return this.tasks;
        
      }),
      take(1),
      tap((tasks)=>{
        newTask.id=generatedId;
        this._tasks.next(tasks.concat(newTask));
      }
        
      ));

  }

  getTasks(){

    return this.authService.token.pipe(
      take(1),
      switchMap((token)=>{
        return this.http
        .get<{[key:string]:TaskData}>(
          `https://task-app-96268-default-rtdb.europe-west1.firebasedatabase.app/tasks.json?auth=${token}`);
      }),
      map((tasksData)=>{
        const tasks:Task[]=[];
  
        for(const key in tasksData){
          if(tasksData.hasOwnProperty(key)){
            tasks.push(new Task(key,tasksData[key].title,tasksData[key].description,tasksData[key].imgUrl,tasksData[key].userId));
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

  deleteTask(id:string){
    
  }

}
