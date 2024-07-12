import React, { useEffect, useState } from 'react';
import { Task } from '../models/Task';
import TaskForm from './TaskForm';
import UserService from '../services/UserService';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
  
  storyId: string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onDelete, storyId }) => {
  const [editingTask, setEditingTask] = React.useState<Task | null>(null);
  const [showTaskForm, setShowTaskForm] = React.useState<boolean>(false);
  const [users,setUsers] = useState<{[key:string]:string}>({})

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const allUsers = await UserService.getAllUsers()
            const userMap: { [key: string]: string } = {}
            allUsers.forEach((user) => {
                userMap[user.id] = `${user.firstName} ${user.lastName}`
            })
            setUsers(userMap)
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

    fetchUsers()
}, [])

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleSave = (task: Task) => {
    onUpdate(task);
    setEditingTask(null);
    setShowTaskForm(false);
  };

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className='rounded-lg bg-gray-900 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white mx-2'>
          {tasks.map((task) => (
            <li className='w-full border-b-2 border-neutral-100 py-4 dark:border-white/10' key={task.id}>
              <div>
                <h3 className='mb-2 text-xl font-medium leading-tight' >{task.name}</h3>
                <p className='mb-4 text-base'>{task.description}</p>
                <p className='mb-4 text-base'>Priority: {task.priority}</p>
                <p className='mb-4 text-base'>Estimated Time: {task.estimatedTime} hours</p>
                <p className='mb-4 text-base'>Status: {task.status}</p>
                <p className='mb-4 text-base'>Assigned User: {task.assignedUserId?users[task.assignedUserId]||'Unassigned':'Unassigned'}</p>
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => onDelete(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showTaskForm && editingTask && (
        <TaskForm
          task={editingTask}
          onSave={handleSave}
          storyId={storyId}
          onClose={() => setShowTaskForm(false)}
        />
      )}
    </div>
  );
};

export default TaskList;
