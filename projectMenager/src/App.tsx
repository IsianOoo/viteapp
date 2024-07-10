import './App.css';
import React, { useState, useEffect } from 'react';
import ProjectService from './services/ProjectService';
import UserService from './services/UserService';
import ActiveProjectService from './services/ActiveProjectService';
import LoginForm from './components/LoginForm';
import { User } from './models/User';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectPage from './pages/ProjectPage';
import TaskPage from './pages/TaskPage';

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(UserService.getLoggedInUser());

  useEffect(() => {
    UserService.mockUsers();
  }, []);

  const handleLogin = (user: User) => {
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };

  return (
    <Router>
      <Navbar />
      <div>
        {loggedInUser ? (
          <div>
            <button
              className="absolute top-0 right-0 m-4 bg-indigo-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
            <Routes>
              <Route path="/projekty" element={<ProjectPage />} />
              <Route path="/zadania/:projectId" element={<TaskPage />} />
              <Route path="*" element={<ProjectPage />} />
            </Routes>
          </div>
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
};

export default App;
