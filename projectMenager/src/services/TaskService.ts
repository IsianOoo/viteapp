import supabase from '../lib/db/supabase';
import { Task } from '../models/Task'
import { v4 as uuidv4 } from 'uuid'

class TaskService {
	static async getAllTasks(): Promise<Task[]> {
    let { data, error } = await supabase.from('Task').select('*');
    if (error) throw error;
    return data as Task[];
  }
  static async getTaskById(id: string): Promise<Task | null> {
    let { data, error } = await supabase.from('Task').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Task;
}

  static async saveTask(task: Task): Promise<void> {
    let { error } = await supabase.from('Task').insert([task]);
    if (error) throw error;
  }

  static async updateTask(task: Task): Promise<void> {
    let { error } = await supabase.from('Task').update(task).eq('id', task.id);
    if (error) throw error;
  }

  static async deleteTask(id: string): Promise<void> {
    let { error } = await supabase.from('Task').delete().eq('id', id);
    if (error) throw error;
  }
  static async getAllTasksByStoryId(storyId: string): Promise<Task[]> {
    let { data, error } = await supabase.from('Task').select('*').eq('storyId', storyId);
    if (error) throw error;
    return data as Task[];
  }
  // static async assignUser(taskId: string, userId: string): Promise<Task> {
  //   let { data, error } = await supabase.from('Task').update({ assignedUserId: userId }).eq('id', taskId).single();
  //   if (error) throw error;
  //   return data as Task;
  // }
}

export default TaskService