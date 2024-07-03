import React from "react";
import { Project } from "../models/Project";

interface ProjectListProps{
    projects:Project[]
    onEdit:(project:Project)=> void
    onDelete:(id:string)=> void
    onSelect: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({projects,onEdit,onDelete,onSelect})=>{
    return(
        <div>
      <h2>Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <button onClick={() => onEdit(project)}>Edit</button>
            <button onClick={() => onDelete(project.id)}>Delete</button>
            <button onClick={() => onSelect(project)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
    )
}

export default ProjectList;