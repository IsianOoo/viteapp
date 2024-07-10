import { Task } from '../models/Task'
import { v4 as uuidv4 } from 'uuid'

class TaskService {
	private static TASKS_KEY = 'tasks'

	static getAllTasks(): Task[] {
		const tasks = localStorage.getItem(this.TASKS_KEY)
		return tasks ? JSON.parse(tasks) : []
	}

	static saveTask(task: Task): void {
		const tasks = this.getAllTasks()
		task.id = uuidv4()
		task.createdAt = new Date().toLocaleDateString()
		tasks.push(task)
		localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks))
	}

	static updateTask(updatedTask: Task): void {
		const tasks = this.getAllTasks()
		const index = tasks.findIndex((t) => t.id === updatedTask.id)
		if (index !== -1) {
			tasks[index] = updatedTask
			localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks))
		}
	}

	static deleteTask(id: string): void {
		let tasks = this.getAllTasks();
		tasks = tasks.filter((task) => task.id !== id);
		localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
	  }
	static getTaskById(id: string): Task | undefined {
		const tasks = this.getAllTasks()
		return tasks.find((task) => task.id === id)
	}

	static assignUser(taskId: string, userId: string): Task {
		let tasks = this.getAllTasks()
		const taskToUpdate = tasks.find((task) => task.id === taskId)
		if (taskToUpdate) {
			taskToUpdate.assignedUserId = userId
			if (taskToUpdate.status === 'todo') {
				taskToUpdate.status = 'doing'
			}
			this.updateTask(taskToUpdate)
			return taskToUpdate
		} else {
			throw new Error(`Task with ID ${taskId} not found.`)
		}
	}
}

export default TaskService
