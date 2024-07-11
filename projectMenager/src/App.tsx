import './App.css'
import React, { useState, useEffect } from 'react'
import ProjectService from './services/ProjectService'
import UserService from './services/UserService'
import ActiveProjectService from './services/ActiveProjectService'
import LoginForm from './components/LoginForm'
import { User } from './models/User'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProjectPage from './pages/ProjectPage'
import TaskPage from './pages/TaskPage'
import { Session } from '@supabase/supabase-js'
import supabase from './lib/db/supabase'

const App: React.FC = () => {
	const [session, setSession] = useState<Session | null>(null)

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})

		return () => subscription.unsubscribe()
	}, [])

	if (!session) {
		return <LoginForm />
	}

	async function signOut() {
		const { error } = await supabase.auth.signOut()
	}

	return (
		<Router>
			<Navbar />
			<div>
				<div>
					<button className='absolute top-0 right-0 m-4 bg-indigo-600 text-white font-bold py-2 px-4 rounded' onClick={signOut}>
						Logout
					</button>
					<Routes>
						<Route path='/projekty' element={<ProjectPage />} />
						<Route path='/zadania/:projectId' element={<TaskPage />} />
						<Route path='*' element={<ProjectPage />} />
					</Routes>
				</div>
			</div>
		</Router>
	)
}

export default App
