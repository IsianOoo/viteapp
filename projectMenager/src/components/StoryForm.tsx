import React, { useState, useEffect } from 'react';
import { Story } from '../models/Story';
import UserService from '../services/UserService';

interface StoryFormProps {
  story?: Story;
  onSave: (story: Story) => void;
  projectId: string;
}

const StoryForm: React.FC<StoryFormProps> = ({ story, onSave, projectId }) => {
  const [name, setName] = useState<string>(story ? story.name : '');
  const [description, setDescription] = useState<string>(story ? story.description : '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(story ? story.priority : 'low');
  const [status, setStatus] = useState<'todo' | 'doing' | 'done'>(story ? story.status : 'todo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loggedInUser = UserService.getLoggedInUser();
    if (loggedInUser) {
      onSave({
        id: story ? story.id : '',
        name,
        description,
        priority,
        projectId,
        createdAt: story ? story.createdAt : new Date().toISOString(),
        status,
        ownerId: loggedInUser.id
      });
    }
    setName('');
    setDescription('');
    setPriority('low');
    setStatus('todo');
  };

  useEffect(() => {
    if (story) {
      setName(story.name);
      setDescription(story.description);
      setPriority(story.priority);
      setStatus(story.status);
    }
  }, [story]);

  return (
    <form className='bg-gray-900 p-10 rounded-lg ' onSubmit={handleSubmit}>
      <div className='grid gap-y-4'>
        <div>
          <label className='block text-sm font-bold ml-1 mb-2 text-white text-surface shadow-secondary-1'>Name</label>
          <input
            className='py-3 px-4 block w-full border-2 border-gray-600 rounded-md text-sm shadow-sm text-white bg-gray-800'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='my-5'>
          <label className='block text-sm font-bold ml-1 mb-2 text-white text-surface shadow-secondary-1'>Description</label>
          <input
            className='py-3 px-4 block w-full border-2 border-gray-600 rounded-md text-sm shadow-sm text-white bg-gray-800'
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className='text-white'>
        <label className='m-5'>Priority</label>
        <select
          className='text-white bg-gray-800 p-1 my-4 rounded-lg'
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className='text-white'>
        <label className='m-5'>Status</label>
        <select
          className='text-white bg-gray-800 p-1 my-4 rounded-lg'
          value={status}
          onChange={(e) => setStatus(e.target.value as 'todo' | 'doing' | 'done')}
        >
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>
      <button className='text-white' type="submit">Save</button>
    </form>
  );
};

export default StoryForm;
