import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import StoryService, { addStory } from '../services/StoryService'
import TaskService, { saveTask } from '../services/TaskService'
import { Story } from '../models/Story'
import { Task } from '../models/Task'
import StoryForm from '../components/StoryForm'
import StoryList from '../components/StoryList'
import Table from '../components/Table'
import TaskForm from '../components/TaskForm'
import { Project } from '../models/Project'

const TaskPage: React.FC = () => {
	const { projectId } = useParams<{ projectId: string }>()
	const [stories, setStories] = useState<Story[]>([])
	const [currentStory, setCurrentStory] = useState<Story | undefined>(undefined)
	const [tasks, setTasks] = useState<Task[]>([])
	const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined)
	const [showTaskForm, setShowTaskForm] = useState<boolean>(false)
	const [currentProject, setCurrentProject] = useState<Project | undefined>(undefined)
  const [isEditForm,setIsEditForm] = useState(false)

	useEffect(() => {
		const fetchStories = async () => {
			if (projectId) {
				const stories = await StoryService.getStoriesByProjectId(projectId)
				setStories(stories)
			}
		}
		fetchStories()
	}, [projectId])

	const handleSaveStory = async (story: Story) => {
		if (projectId) {
			const addedStory = await addStory(story)
			const stories = await StoryService.getStoriesByProjectId(projectId)
			setStories(stories)
      
		} else {
			console.error('Error adding story:')
		}
	}

	const handleEditStory = (story: Story) => {
		setCurrentStory(story)
    setIsEditForm(true)
	}

	const handleDeleteStory = async (id: string) => {
		await StoryService.deleteStory(id)
		if (projectId) {
			const stories = await StoryService.getStoriesByProjectId(projectId)
			setStories(stories)
		}
	}

	const handleSelectStory = (story: Story) => {
		setCurrentStory(story)
		const fetchTasks = async () => {
			const tasks = await TaskService.getTasksByStoryId(story.id)
			setTasks(tasks)
		}
		fetchTasks()
	}

	const handleSaveTask = async (task: Omit<Task, 'id'>) => {
		await saveTask(task)
		if (currentStory) {
			const tasks = await TaskService.getTasksByStoryId(currentStory.id)
			setTasks(tasks)
		}
		setCurrentTask(undefined)
		setShowTaskForm(false)
	}

	const handleEditTask = (task: Task) => {
		setCurrentTask(task)
		setShowTaskForm(true)
	}

	const handleDeleteTask = async (id: string) => {
		await TaskService.deleteTask(id)
		if (currentStory) {
			const tasks = await TaskService.getTasksByStoryId(currentStory.id)
			setTasks(tasks)
		}
	}

	const handleUpdateTask = async (task: Task) => {
		await TaskService.updateTask(task)
		if (currentStory) {
			const tasks = await TaskService.getTasksByStoryId(currentStory.id)
			setTasks(tasks)
		}
    if(projectId){
      const stories = await StoryService.getStoriesByProjectId(projectId)
			setStories(stories)
    }
    
		setCurrentTask(undefined)
    
		setShowTaskForm(false)
	}
	const handleUpdateStory = async (story: Story) => {
		console.log(story)
		await StoryService.updateStory(story)
		if (currentProject) {
			const story = await StoryService.getStoriesByProjectId(currentProject.id)
      
			setStories(story)
		}
		setCurrentProject(undefined)
    setIsEditForm(false)
    setCurrentStory(undefined)
	}

	return (
		<div>
			<StoryForm story={currentStory} onSave={handleSaveStory} projectId={projectId!} onUpdate={handleUpdateStory} isEdit={isEditForm} />
			<StoryList stories={stories} onEdit={handleEditStory} onDelete={handleDeleteStory} onSelect={handleSelectStory} />
			{currentStory && (
				<>
					<Table
						tasks={tasks}
						onEdit={handleEditTask}
						onDelete={handleDeleteTask}
						onUpdate={handleUpdateTask}
						storyId={currentStory.id}
					/>
					<button onClick={() => setCurrentTask({} as Task)} className='bg-blue-500 text-white px-4 py-2 rounded mt-4'>
						Add Task
					</button>
					{currentTask && (
						<TaskForm
							task={currentTask}
							onSave={handleSaveTask}
							storyId={currentStory.id}
							onClose={() => setCurrentTask(undefined)}
						/>
					)}
				</>
			)}
		</div>
	)
}

export default TaskPage
