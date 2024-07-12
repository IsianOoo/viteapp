import React, { useState, useEffect } from 'react'
import { Task } from '../models/Task'
import UserService from '../services/UserService'
import { User } from '../models/User'
import { v4 as uuidv4 } from 'uuid'

interface TaskFormProps {
	task?: Task
	onSave: (task: Task) => void
	storyId: string
	onClose: () => void
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, storyId, onClose }) => {
	console.log(task)
	const [name, setName] = useState<string>(task?.name ?? '')
	const [description, setDescription] = useState<string>(task?.description ?? '')
	const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(task?.priority ?? 'low')
	const [estimatedTime, setEstimatedTime] = useState<number>(task?.estimatedTime ?? 0)
	const [status, setStatus] = useState<'todo' | 'doing' | 'done'>(task?.status ?? 'todo')
	const [assignedUserId, setAssignedUserId] = useState<string | undefined>(task?.assignedUserId ?? undefined)
	const [users, setUsers] = useState<User[]>([])

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const allUsers = await UserService.getAllUsers()
				const nonAdminUsers = allUsers.filter((user) => user.role !== 'admin')
				setUsers(nonAdminUsers)
			} catch (error) {
				console.error('Error fetching users:', error)
			}
		}
		fetchUsers()
	}, [])

	const changeUserHandler = (value: string) => {
		setAssignedUserId(value)
		setStatus('doing')
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const createdAt = new Date().toISOString()
		const startAt = new Date().toISOString()
		const endAt = new Date().toISOString()
		const newTask: Task = {
      id:task?.id ?? uuidv4(),
			name,
			description,
			priority,
			storyId,
			estimatedTime,
			status,
			createdAt,
			startAt,
			endAt,
			assignedUserId,
			// : priority !== 'low' ? assignedUserId : undefined
		}
		try {
			await onSave(newTask)
			setName('')
			setDescription('')
			setPriority('low')
			setEstimatedTime(0)
			setStatus('todo')
			setAssignedUserId(undefined)
		} catch (error) {
			console.error('Error adding task:', error)
		}
	}

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black'>
			<div className='bg-white p-6 rounded-lg shadow-lg w-96'>
				<form onSubmit={handleSubmit}>
					<div>
						<label className='block text-sm font-bold mb-2'>Name</label>
						<input
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className='w-full p-2 border rounded'
						/>
					</div>
					<div>
						<label className='block text-sm font-bold mb-2'>Description</label>
						<input
							type='text'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
							className='w-full p-2 border rounded'
						/>
					</div>
					<div>
						<label className='block text-sm font-bold mb-2'>Priority</label>
						<select
							value={priority}
							onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
							className='w-full p-2 border rounded'>
							<option value='low'>Low</option>
							<option value='medium'>Medium</option>
							<option value='high'>High</option>
						</select>
					</div>
					<div>
						<label className='block text-sm font-bold mb-2'>Estimated Time</label>
						<input
							type='number'
							value={estimatedTime}
							onChange={(e) => setEstimatedTime(parseFloat(e.target.value))}
							className='w-full p-2 border rounded'
						/>
					</div>
					<div>
						<label className='block text-sm font-bold mb-2'>Status</label>
						<select
							value={status}
							onChange={(e) => setStatus(e.target.value as 'todo' | 'doing' | 'done')}
							className='w-full p-2 border rounded'>
							<option value='todo'>To Do</option>
							<option value='doing'>Doing</option>
							<option value='done'>Done</option>
						</select>
					</div>

					<div>
						<label className='block text-sm font-bold mb-2'>Assign User</label>
						<select
							value={assignedUserId || ''}
							onChange={(e) => changeUserHandler(e.target.value)}
							className='w-full p-2 border rounded'>
							<option value=''>Select User</option>
							{users.map((user) => (
								<option key={user.id} value={user.id}>
									{user.firstName} {user.lastName}
								</option>
							))}
						</select>
					</div>

					<div className='flex justify-end mt-4'>
						<button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded mr-2'>
							Save
						</button>
						<button type='button' onClick={onClose} className='bg-gray-500 text-white px-4 py-2 rounded'>
							Close
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default TaskForm
