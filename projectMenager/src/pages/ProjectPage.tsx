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
      const projects = await ProjectService.getAllProjects();  // Re-fetch projects to ensure updated data
      setProjects(projects);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleSaveProject = async (project: Project) => {
    if (project.id === '') {
      await ProjectService.saveProject(project);
    } else {
      await ProjectService.updateProject(project);
    }
    const projects = await ProjectService.getAllProjects();
    setProjects(projects);
    setCurrentProject(undefined);
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

  return (
    <div>
      <ProjectForm onAddProject={handleAddProject} />
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
