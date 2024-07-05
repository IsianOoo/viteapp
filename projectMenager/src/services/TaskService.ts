
import { Task } from "../models/Task";
import {v4 as uuidv4} from 'uuid';


class TaskService{
    private static TASKS_KEY = 'tasks'

    static getAllTasks():Task[]{
        const tasks = localStorage.getItem(this.TASKS_KEY)
        return tasks? JSON.parse(tasks):[]
    }

    static saveTask(task:Task):void{
        const tasks = this.getAllTasks()
        task.id = uuidv4()
        task.createdAt = new Date().toLocaleDateString()
        tasks.push(task)
        localStorage.setItem(this.TASKS_KEY,JSON.stringify(tasks))
    }

    static updateTask(updatedTask:Task):void{
        const tasks = this.getAllTasks()
        const index = tasks.findIndex(t=>t.id === updatedTask.id)
        if(index !== -1){
            tasks[index] = updatedTask
            localStorage.setItem(this.TASKS_KEY,JSON.stringify(tasks))
        }
    }

    static deleteTask(id:string):void{
        let tasks = this.getAllTasks()
        tasks.filter(task=> task.id !==id)
        localStorage.setItem(this.TASKS_KEY,JSON.stringify(tasks))
    }
}

export default TaskService