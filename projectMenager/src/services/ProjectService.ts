import { Project } from "../models/Project";
import {v4 as uuidv4} from 'uuid';

class ProjectUserService{
    private static readonly STORAGE_KEY = 'projects'

    static getAllProject():Project[]{
        const projects = localStorage.getItem(this.STORAGE_KEY);
        return projects? JSON.parse(projects):[];
    }

    static saveProject(project:Project):void{
        const projects = this.getAllProject();
        project.id = uuidv4();
        projects.push(project);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
    }
    static updateProject(updatedProject:Project):void{
        let projects = this.getAllProject()
        projects = projects.map(project=> project.id === updatedProject.id ? updatedProject:project)
        localStorage.setItem(this.STORAGE_KEY,JSON.stringify(projects))
    }
    static deleteProject(id:string):void{
        const projects = this.getAllProject().filter(project=> project.id !== id);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
    }
}
export default ProjectUserService