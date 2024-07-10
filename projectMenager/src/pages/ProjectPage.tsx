import React, { useState, useEffect } from 'react';
import ProjectService from '../services/ProjectService';
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
    setProjects(ProjectService.getAllProject());
  }, []);

  const handleSaveProject = (project: Project) => {
    if (project.id === '') {
      ProjectService.saveProject(project);
    } else {
      ProjectService.updateProject(project);
    }
    setProjects(ProjectService.getAllProject());
    setCurrentProject(undefined);
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
  };

  const handleDeleteProject = (id: string) => {
    ProjectService.deleteProject(id);
    setProjects(ProjectService.getAllProject());
    ActiveProjectService.clearActiveProject();
    setCurrentProject(undefined);
  };

  const handleSelectProject = (project: Project) => {
    ActiveProjectService.setActiveProject(project);
    navigate(`/zadania/${project.id}`);
  };

  return (
    <div>
      <ProjectForm project={currentProject} onSave={handleSaveProject} />
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
