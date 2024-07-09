import React, { useState, useEffect } from 'react'
import { Project } from '../models/Project'

interface ProjectFormProps {
	project?: Project
	onSave: (project: Project) => void
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSave }) => {
	const [name, setName] = useState(project ? project.name : '')
	const [description, setDescription] = useState(project ? project.description : '')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSave({ id: project ? project.id : '', name, description })
		setName('')
		setDescription('')
	}
	useEffect(() => {
		if (project) {
			setName(project.name)
			setDescription(project.description)
		}
	}, [project])

	return (
		<>
		<form onSubmit={handleSubmit}>
		<div className='block rounded-lg bg-gray-900 p-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white'>
		<h5 className="mb-2 text-xl font-medium leading-tight">Stwórz Projekt</h5>
		<div>
			<label className='block text-sm font-medium leading-6'>Name</label>
			<input className='block w-full rounded-md border-0 py-1.5 text-white shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 p-2 bg-gray-800' type='text' value={name} onChange={(e) => setName(e.target.value)} />
		</div>
		<div>
			<label className='block text-sm font-medium leading-6'>Description</label>
			<input className='block w-full rounded-md border-0 py-1.5 text-white shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 p-2 bg-gray-800' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
		</div>
		<button className='mt-5' type='submit'>Save</button>
		</div>
		</form>
		{/* <form onSubmit={handleSubmit}>
		<div>
			<label>Name</label>
			<input type='text' value={name} onChange={(e) => setName(e.target.value)} />
		</div>
		<div>
			<label>Description</label>
			<input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
		</div>
		<button type='submit'>Save</button>
	</form> */}
	</>
)
		
}

export default ProjectForm;
