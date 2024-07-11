import supabase from "../lib/db/supabase";
import { Project } from "../models/Project";
import {v4 as uuidv4} from 'uuid';

class ProjectUserService{
    
    // static async getAllProjects(): Promise<Project[]> {
    //   let { data, error } = await supabase.from('Project').select('*');
    //   if (error) throw error;
    //   return data as Project[];
    // }
  
    static async saveProject(project: Project): Promise<void> {
      let { error } = await supabase.from('Project').insert([project]);
      if (error) throw error;
    }
  
    static async updateProject(project: Project): Promise<void> {
      let { error } = await supabase.from('Project').update(project).eq('id', project.id);
      if (error) throw error;
    }
  
    // static async deleteProject(id: string): Promise<void> {
    //   let { error } = await supabase.from('Project').delete().eq('id', id);
    //   if (error) throw error;
    // }

    static async deleteProject(id: string): Promise<void> {
      try {
        const { data, error } = await supabase
          .from('Project')
          .delete()
          .eq('id', id)
  
        if (error) {
          throw error
        }
  
        console.log('Project deleted:', data)
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error deleting project:', error.message)
        } else {
          console.error('An unknown error occurred while deleting the project.')
        }
      }
    }
  
    static async getAllProjects(): Promise<any[]> {
      try {
        const { data, error } = await supabase
          .from('Project')
          .select('*')
  
        if (error) {
          throw error
        }
        console.log(data);
        return  data
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching projects:', error.message)
        } else {
          console.error('An unknown error occurred while fetching the projects.')
        }
        return []
      }
    }
}

export const addProject = async (project: Project): Promise<Project> => {
  const { data, error } = await supabase.from('Project').insert([project]).single() // Ensure single object is returned

  if (error) {
      console.error('Error adding project:', error)
      throw error
  }

  return data
}
export default ProjectUserService