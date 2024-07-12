import supabase from "../lib/db/supabase";
import { Project } from "../models/Project";

class ProjectUserService {
  static async saveProject(project: Project): Promise<void> {
    let { error } = await supabase.from('Project').insert([project]);
    if (error) throw error;
  }

  static async updateProject(project: Project): Promise<void> {
    let { error } = await supabase.from('Project').update(project).eq('id', project.id);
    if (error) throw error;
  }

  static async deleteProject(id: string): Promise<void> {
    let { error } = await supabase.from('Project').delete().eq('id', id);
    if (error) throw error;
  }

  static async getAllProjects(): Promise<Project[]> {
    let { data, error } = await supabase.from('Project').select('*');
    if (error) throw error;
    return data as Project[];
  }
}

export const addProject = async (project: Project): Promise<Project> => {
  const { data, error } = await supabase.from('Project').insert([project]).single();
  if (error) throw error;
  return data as Project;
};

export const updateProject = async (project: Project): Promise<Project> => {
  const { data, error } = await supabase
    .from('Project')
    .update({
      name: project.name,
      description: project.description,
    })
    .eq('id', project.id)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data as Project;
};

export default ProjectUserService;
