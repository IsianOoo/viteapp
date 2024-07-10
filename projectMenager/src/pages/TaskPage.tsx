import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StoryForm from '../components/StoryForm';
import StoryList from '../components/StoryList';
import Table from '../components/Table';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import StoryService from '../services/StoryService';
import TaskService from '../services/TaskService';
import { Story } from '../models/Story';
import { Task } from '../models/Task';

const TaskPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStory, setCurrentStory] = useState<Story | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);

  useEffect(() => {
    if (projectId) {
      setStories(StoryService.getAllStories().filter(story => story.projectId === projectId));
    }
  }, [projectId]);

  const handleSaveStory = (story: Story) => {
    if (story.id === '') {
      StoryService.saveStories(story);
    } else {
      StoryService.updateStory(story);
    }
    setStories(StoryService.getAllStories().filter(s => s.projectId === projectId));
    setCurrentStory(undefined);
  };

  const handleEditStory = (story: Story) => {
    setCurrentStory(story);
  };

  const handleDeleteStory = (id: string) => {
    StoryService.daleteStory(id);
    setStories(StoryService.getAllStories().filter(story => story.projectId === projectId));
  };

  const handleSelectStory = (story: Story) => {
    setCurrentStory(story);
    setTasks(TaskService.getAllTasks().filter((task) => task.storyId === story.id));
  };

  const handleSaveTask = (task: Task) => {
    if (task.id === '') {
      TaskService.saveTask(task);
    } else {
      TaskService.updateTask(task);
    }
    setTasks(TaskService.getAllTasks().filter((t) => t.storyId === currentStory?.id));
    setCurrentTask(undefined);
    setShowTaskForm(false);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = (id: string) => {
    TaskService.deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (task: Task) => {
    TaskService.updateTask(task);
    setTasks(TaskService.getAllTasks().filter((t) => t.storyId === currentStory?.id));
  };

  const handleAssignUser = (taskId: string, userId: string) => {
    const updatedTask = TaskService.assignUser(taskId, userId);
    if (updatedTask.status === 'todo') {
      updatedTask.status = 'doing';
      TaskService.updateTask(updatedTask);
      setTasks((prevTasks) => prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    } else {
      TaskService.updateTask(updatedTask);
      setTasks((prevTasks) => prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    }
  };

  return (
    <div>
      <StoryForm story={currentStory} onSave={handleSaveStory} projectId={projectId!} />
      <StoryList
        stories={stories}
        onEdit={handleEditStory}
        onDelete={handleDeleteStory}
        onSelect={handleSelectStory}
      />
      {currentStory && (
        <>
          <h2 className='my-2 text-xl font-medium leading-tight dark:text-white'>Zadania dla {currentStory.name}</h2>
          <Table
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
            onAssignUser={handleAssignUser}
            storyId={currentStory.id}
          />
          
          <button
            onClick={() => setShowTaskForm(true)}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
          {showTaskForm && (
            <TaskForm
              task={currentTask}
              onSave={handleSaveTask}
              storyId={currentStory.id}
              onClose={() => setShowTaskForm(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TaskPage;
