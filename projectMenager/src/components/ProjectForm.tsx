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
		<form onSubmit={handleSubmit}>
			<div>
				<label>Name</label>
				<input type='text' value={name} onChange={(e) => setName(e.target.value)} />
			</div>
			<div>
				<label>Description</label>
				<input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
			</div>
			<button type='submit'>Save</button>
		</form>
	)
}

export default ProjectForm;
