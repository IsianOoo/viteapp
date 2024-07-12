import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StoryService, { addStory } from '../services/StoryService';
import TaskService, { saveTask } from '../services/TaskService';
import { Story } from '../models/Story';
import { Task } from '../models/Task';
import StoryForm from '../components/StoryForm';
import StoryList from '../components/StoryList';
import Table from '../components/Table';
import TaskForm from '../components/TaskForm';

const TaskPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStory, setCurrentStory] = useState<Story | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

  useEffect(() => {
    const fetchStories = async () => {
      if (projectId) {
        const stories = await StoryService.getStoriesByProjectId(projectId);
        setStories(stories);
      }
    };
    fetchStories();
  }, [projectId]);

  const handleSaveStory = async (story: Story) => {
    if (projectId) {
      const addedStory = await addStory(story);
      const stories = await StoryService.getStoriesByProjectId(projectId);
      setStories(stories);
    } else {
      console.error('Error adding story:');
    }
  };

  const handleEditStory = (story: Story) => {
    setCurrentStory(story);
  };

  const handleDeleteStory = async (id: string) => {
    await StoryService.deleteStory(id);
    if (projectId) {
      const stories = await StoryService.getStoriesByProjectId(projectId);
      setStories(stories);
    }
  };

  const handleSelectStory = (story: Story) => {
    setCurrentStory(story);
    const fetchTasks = async () => {
      const tasks = await TaskService.getTasksByStoryId(story.id);
      setTasks(tasks);
    };
    fetchTasks();
  };

  const handleSaveTask = async (task: Task) => {
    await saveTask(task);
    if (currentStory) {
      const tasks = await TaskService.getTasksByStoryId(currentStory.id);
      setTasks(tasks);
    }
    setCurrentTask(undefined);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
  };

  const handleDeleteTask = async (id: string) => {
    await TaskService.deleteTask(id);
    if (currentStory) {
      const tasks = await TaskService.getTasksByStoryId(currentStory.id);
      setTasks(tasks);
    }
  };

  return (
    <div>
      <StoryForm story={currentStory} onSave={handleSaveStory} projectId={projectId!} />
      <StoryList stories={stories} onEdit={handleEditStory} onDelete={handleDeleteStory} onSelect={handleSelectStory} />
      {currentStory && (
        <>
          <Table tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} onUpdate={handleSaveTask} storyId={currentStory.id} />
          <button onClick={() => setCurrentTask({} as Task)} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Add Task</button>
          {currentTask && <TaskForm task={currentTask} onSave={handleSaveTask} storyId={currentStory.id} onClose={() => setCurrentTask(undefined)} />}
        </>
      )}
    </div>
  );
};

export default TaskPage;
