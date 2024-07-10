import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StoryForm from '../components/StoryForm';
import StoryList from '../components/StoryList';
import Table from '../components/Table';
import TaskForm from '../components/TaskForm';
import StoryService from '../services/StoryService';
import TaskService from '../services/TaskService';
import { Story } from '../models/Story';
import { Task } from '../models/Task';
import TaskList from '../components/TaskList';

const TaskPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStory, setCurrentStory] = useState<Story | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

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
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
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
      <StoryList stories={stories} onEdit={handleEditStory} onDelete={handleDeleteStory} onSelect={handleSelectStory} />
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
          <TaskForm task={currentTask} onSave={handleSaveTask} storyId={currentStory.id} />
          {/* <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
            storyId={currentStory.id}
          /> */}
        </>
      )}
    </div>
  );
};

export default TaskPage;
