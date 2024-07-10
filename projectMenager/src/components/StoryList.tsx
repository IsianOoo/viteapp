import React from 'react';
import { Story } from '../models/Story';

interface StoryListProps {
  stories: Story[];
  onEdit: (story: Story) => void;
  onDelete: (id: string) => void;
  onSelect: (story: Story) => void
}


type StoryStatus = 'todo' | 'doing' | 'done';

const StoryList: React.FC<StoryListProps> = ({ stories, onEdit, onDelete,onSelect }) => {
  const filteredStories: { [key in StoryStatus]: Story[] } = {
    todo: stories.filter(story => story.status === 'todo'),
    doing: stories.filter(story => story.status === 'doing'),
    done: stories.filter(story => story.status === 'done'),
  };

  const statuses: StoryStatus[] = ['todo', 'doing', 'done'];

  return (
    <div className='grid grid-cols-3 gap-3'>
      {statuses.map(status => (
        <div key={status}>
          <h3 className='uppercase font-bold mt-5 rounded-lg bg-gray-900 p-5 text-white mb-1'>{status.charAt(0).toUpperCase() + status.slice(1)}</h3>
          <ul className='rounded-lg bg-gray-900  text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white '>
            {filteredStories[status].map(story => (
              <li className='w-full border-b-2 border-neutral-100 py-4 dark:border-white/10' key={story.id}>
                <h4 className='mb-2 text-xl font-medium leading-tight'>{story.name}</h4>
                <p className='mb-4 text-base'>{story.description}</p>
                <p className='mb-4 text-base'>Priority: {story.priority}</p>
                <p className='mb-4 text-base'>Owner ID: {story.ownerId}</p>
                <button onClick={() => onEdit(story)}>Edit</button>
                <button className='mx-5' onClick={() => onDelete(story.id)}>Delete</button>
                <button onClick={() => onSelect(story)}>Show Tasks</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default StoryList;
