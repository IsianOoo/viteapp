import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StoryService from '../services/StoryService';
import TaskService from '../services/TaskService';
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
    if (story.id === '') {
      await StoryService.saveStory(story);
    } else {
      await StoryService.updateStory(story);
    }
    if (projectId) {
      const stories = await StoryService.getStoriesByProjectId(projectId);
      setStories(stories);
    }
    setCurrentStory(undefined);
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

  const handleSelectStory = async (story: Story) => {
    setCurrentStory(story);
    const tasks = await TaskService.getAllTasksByStoryId(story.id);
    setTasks(tasks);
  };

  const handleSaveTask = async (task: Task) => {
    if (task.id === '') {
      await TaskService.saveTask(task);
    } else {
      await TaskService.updateTask(task);
    }
    if (currentStory) {
      const tasks = await TaskService.getAllTasksByStoryId(currentStory.id);
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
      const tasks = await TaskService.getAllTasksByStoryId(currentStory.id);
      setTasks(tasks);
    }
  };

  const handleUpdateTask = async (task: Task) => {
    await TaskService.updateTask(task);
    if (currentStory) {
      const tasks = await TaskService.getAllTasksByStoryId(currentStory.id);
      setTasks(tasks);
    }
  };

  const handleAssignUser = async (taskId: string, userId: string) => {
    const task = await TaskService.getTaskById(taskId);
    if (task) {
      task.assignedUserId = userId;
      task.status = 'doing';
      await TaskService.updateTask(task);
      if (currentStory) {
        const tasks = await TaskService.getAllTasksByStoryId(currentStory.id);
        setTasks(tasks);
      }
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
          <h2>Kanban Board for {currentStory.name}</h2>
          <Table
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
            onAssignUser={handleAssignUser}
            storyId={currentStory.id}
          />
          <h2>Tasks for {currentStory.name}</h2>
          <TaskForm
            task={currentTask}
            onSave={handleSaveTask}
            storyId={currentStory.id}
            onClose={() => setCurrentTask(undefined)}
          />
        </>
      )}
    </div>
  );
};

export default TaskPage;
