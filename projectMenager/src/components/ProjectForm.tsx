import React, { useState, useEffect } from 'react';
import { Project } from '../models/Project';
import { v4 as uuidv4 } from 'uuid';

interface ProjectFormProps {
  onAddProject: (project: Project) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onAddProject }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = { id: uuidv4(), name, description };
    try {
      await onAddProject(newProject);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='block rounded-lg bg-gray-900 p-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white mt-5'>
          <h5 className="mb-2 text-xl font-medium leading-tight">Stwórz Projekt</h5>
          <div>
            <label className='block text-sm font-medium leading-6'>Name</label>
            <input
              className='block w-full rounded-md border-0 py-1.5 text-white shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 p-2 bg-gray-800'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className='block text-sm font-medium leading-6'>Description</label>
            <input
              className='block w-full rounded-md border-0 py-1.5 text-white shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 p-2 bg-gray-800'
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button className='mt-5' type='submit'>Save</button>
        </div>
      </form>
    </>
  );
};

export default ProjectForm;
