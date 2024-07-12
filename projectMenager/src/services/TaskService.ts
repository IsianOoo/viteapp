import supabase from '../lib/db/supabase'
import { Task } from '../models/Task'


class TaskService {
	static async getAllTasks(): Promise<Task[]> {
		let { data, error } = await supabase.from('Task').select('*')
		if (error) throw error
		return data as Task[]
	}
	static async getTaskById(id: string): Promise<Task | null> {
		let { data, error } = await supabase.from('Task').select('*').eq('id', id).single()
		if (error) throw error
		return data as Task
	}

	static async getTasksByStoryId(storyId: string): Promise<Task[]> {
		let { data, error } = await supabase.from('Task').select('*').eq('storyId', storyId)
		if (error) throw error
		return data as Task[]
	}

	static async updateTask(task: Task): Promise<void> {
		console.log(task)
		let { error } = await supabase.from('Task').update(task).eq('id', task.id)
		if (error) throw error
	}

	static async deleteTask(id: string): Promise<void> {
		let { error } = await supabase.from('Task').delete().eq('id', id)
		if (error) throw error
	}
	static async getAllTasksByStoryId(storyId: string): Promise<Task[]> {
		let { data, error } = await supabase.from('Task').select('*').eq('storyId', storyId)
		if (error) throw error
		return data as Task[]
	}
}
export const saveTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
	if (task.priority !== 'low' && !task.assignedUserId) {
		throw new Error('assignedUserId is required for non-low priority tasks')
	}

	const { data, error } = await supabase
		.from('Task')
		.insert([
			{
				name: task.name,
				description: task.description,
				priority: task.priority || 'low',
				storyId: task.storyId,
				estimatedTime: task.estimatedTime,
				status: task.status,
				createdAt: task.createdAt,
				startAt: task.startAt,
				endAt: task.endAt,
				assignedUserId: task.assignedUserId || undefined,
			},
		])
		.single()

	if (error) {
		throw error
	}
	return data as Task
}

export default TaskService
