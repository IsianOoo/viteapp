import { User } from '../models/User'
import { v4 as uuidv4 } from 'uuid'

class UserService {
	private static USERS_KEY = 'users'
	private static STORAGE_KEY = 'loggedInUser'

	static mockUsers(): void {
		const users: User[] = [
			{ id: uuidv4(), firstName: 'Adam', lastName: 'aaa', role: 'admin' },
			{ id: uuidv4(), firstName: 'Patryk', lastName: 'sas', role: 'devops' },
			{ id: uuidv4(), firstName: 'Jan', lastName: 'sus', role: 'developer' },
		]
		localStorage.setItem(this.USERS_KEY, JSON.stringify(users))
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users[0]))
	}

	static getAllUsers(): User[] {
		const users = localStorage.getItem(this.USERS_KEY)
		return users ? JSON.parse(users) : []
	}

	static getLoggedInUser(): User | null {
		const user = localStorage.getItem(this.STORAGE_KEY)
		return user ? JSON.parse(user) : null
	}
}
export default UserService
