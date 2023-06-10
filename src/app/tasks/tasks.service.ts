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




  constructor(private http:HttpClient, private authService:AuthService) {
      
   }

   deleteTask(id:string){
    // this.firestoreCollection.doc(id).delete();
    console.log("deleteTask");
   }

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
          'https://picsum.photos/seed/picsum/500/500',
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

  deleteTas(id:string){
    
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
  
       // this._tasks.next(tasks); 
        return tasks;
      }),
      tap(tasks=>{
        this._tasks.next(tasks);
      })
    );
  }

  // getTask(id: string){
  //   return this.oldTasks.find((t) => t.id === id);
  // }

  getTAsk(id: string) {
    //return this.recipes.find((r) => r.id === id);
    return this.authService.token.pipe(
      take(1),
      switchMap((token) =>
        this.http.get<TaskData>(
          `https://task-app-96268-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json?auth=${token}`
        )
      ),
      map((resData) => {
        console.log(resData);
        return new Task(
          id ,
          resData.title,
          resData.description,
          resData.imgUrl,
          resData.userId
        );
      })
    );
  }

 


}
