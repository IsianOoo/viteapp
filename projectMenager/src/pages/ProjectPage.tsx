import React, { useState, useEffect } from 'react';
import ProjectService, { addProject,updateProject } from '../services/ProjectService';
import { Project } from '../models/Project';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';
import ActiveProjectService from '../services/ActiveProjectService';
import { useNavigate } from 'react-router-dom';


const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await ProjectService.getAllProjects();
      setProjects(projects);
    };
    fetchProjects();
  }, []);

  const handleAddProject = async (newProject: Project) => {
    try {
      const addedProject = await addProject(newProject);
      const projects = await ProjectService.getAllProjects();  
      setProjects(projects);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
  };

  const handleDeleteProject = async (id: string) => {
    await ProjectService.deleteProject(id);
    const projects = await ProjectService.getAllProjects();
    setProjects(projects);
  };

  const handleSelectProject = (project: Project) => {
    ActiveProjectService.setActiveProject(project);
    navigate(`/zadania/${project.id}`);
  };

  const handleUpdateProject = async (updatedProject: Project) => {
    try {
      await updateProject(updatedProject);
      const updatedProjects = projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      );
      setProjects(updatedProjects);
      setCurrentProject(undefined);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  }; 

  return (
    <div>
      <ProjectForm onAddProject={handleAddProject} onUpdateProject={handleUpdateProject} currentProject={currentProject} />
      <ProjectList
        projects={projects}
        onEdit={handleEditProject}
        onDelete={handleDeleteProject}
        onSelect={handleSelectProject}
        
      />
    </div>
  );
};

export default ProjectPage;
