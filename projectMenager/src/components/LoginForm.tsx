import React, { useState } from 'react'
import UserService from '../services/UserService'
import { User } from '../models/User'
import supabase from '../lib/db/supabase'

interface LoginFormProps {
	onLogin: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ login, password }),
      });
      const data = await response.json();
      if (response.ok) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('refreshToken', data.refreshToken);
          setMessage('Login successful');
          onLogin()
           
      } else {
          setMessage('Login failed: ' + data.message);
          console.log(data);
      }
  } catch (error) {
      console.log(error);
      setMessage('Login failed:error ');
      
  }




  }
    // const { data, error } = await supabase.auth.signInWithPassword({
    //     email: login,
    //     password: password,
    // })

    // if (error) {
    //     setMessage('Login failed: ' + error)
    // } else {
    //     setMessage('Login successfull')
    // }


	return (
    <>
    <h1>Project Manager</h1>
    <div className='border-2 border-black rounded-md my-10 pb-5'>
    <div className='flex min-h-full flex-col justify-center px-6 py-5 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-600'>Panel logowania</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
    <div>
      <label  className="block text-sm font-medium leading-6 text-gray-900">Login</label>
      <div className="mt-2">
        <input  type="text"  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" value={login} onChange={(e) => setLogin(e.target.value)}/>
      </div>
    </div>

    <div>
      <div className="">
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
        
      </div>
      <div className="mt-2">
        <input id="password" name="password" type="password"  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
    </div>
    {message && <p>{message}</p>}
    <div>
      <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
    </div>
  </form>

  
</div>
      {/* <form onSubmit={handleSubmit}>
      <div>
        <label>Login</label>
        <input type='text' value={login} onChange={(e) => setLogin(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type='submit'>Login</button>
    </form>
    {message && <p>{message}</p>} */}
    </div>
    
  </div></>
		
	)
}

export default LoginForm
