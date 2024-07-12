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

import supabase from './lib/db/supabase'

const App: React.FC = () => {
	
	const [isLogin,setIsLogin] = useState(false)
 
	useEffect(() => {
		
		const check = localStorage.getItem('token')
		if(check){
			setIsLogin(true)
		}else{
			setIsLogin(false)
		}

		
	}, [])

	if (!isLogin) {
		return <LoginForm onLogin={()=>setIsLogin(true)} />
	}

	async function signOut() {
		localStorage.removeItem('token')
		localStorage.removeItem('refreshToken')
		setIsLogin(false)
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
