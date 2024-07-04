import { User } from '../models/User'
import {v4 as uuidv4} from 'uuid';

class UserService {
	private static USERS_KEY = 'users'
	private static  STORAGE_KEY = 'loggedInUser'

	static getLoggedInUser(): User | null {
		const user = localStorage.getItem(this.STORAGE_KEY)
		return user ? JSON.parse(user) : null
	}

	static setLoggedInUser(user: User): void {
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user))
	}

	static mockLoggedInUser(): void {
		const mockUser: User = {
			id: '1',
			firstName: 'John',
			lastName: 'Doe',
			role:'admin'
		}
        this.setLoggedInUser(mockUser);
	}
}
export default UserService;
