import React from "react";
import { Project } from "../models/Project";

interface ProjectListProps{
    projects:Project[]
    onEdit:(project:Project)=> void
    onDelete:(id:string)=> void
    onSelect: (project: Project) => void;
    onUpdate: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({projects,onEdit,onDelete,onSelect,onUpdate})=>{
    return(
        <div className="">
      <h2 className="my-5 font-bold uppercase">Projects</h2>
      <ul className=" rounded-lg bg-gray-900 p-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white ">
        {projects.map(project => (
          <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10" key={project.id}>
            <h3 className="mb-2 text-xl font-medium leading-tight">{project.name}</h3>
            <p className="mb-4 text-base">{project.description}</p>
            <button onClick={() => onEdit(project)}>Edit</button>
            <button className="mx-5" onClick={() => onDelete(project.id)}>Delete</button>
            <button onClick={() => onSelect(project)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
    )
}

export default ProjectList;