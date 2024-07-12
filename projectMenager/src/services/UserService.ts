import supabase from '../lib/db/supabase'
import { User } from '../models/User'
import { v4 as uuidv4 } from 'uuid'

class UserService {
	private static USERS_KEY = 'users'
	private static STORAGE_KEY = 'loggedInUser'

	static mockUsers(): void {
		const mockUsers: User[] = [
			{ id: uuidv4(), firstName: 'Jan', lastName: 'Adminowski', role: 'admin', login: 'admin', password: 'admin' },
			{ id: uuidv4(), firstName: 'Jan', lastName: 'Developowski', role: 'devops', login: 'devops', password: 'devops' },
			{
				id: uuidv4(),
				firstName: 'Jan',
				lastName: 'Developer',
				role: 'developer',
				login: 'developer',
				password: 'developer',
			},
		]
		localStorage.setItem(this.USERS_KEY, JSON.stringify(mockUsers))
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mockUsers[0]))
	}

	static async getAllUsers(): Promise<User[]> {
		const { data, error } = await supabase.from('User').select('*')
		if (error) {
			throw new Error(error.message)
		}
		return data as User[]
	}

    static async getUserByLogin(login:string): Promise<User |null>{
        const {data,error} = await supabase.from('User').select('*').eq('login',login).single()
        if(error || !data)return null
        return data as User
    }

	static getLoggedInUser(): User | null {
		const user = localStorage.getItem(this.STORAGE_KEY)
		return user ? JSON.parse(user) : null
	}

	// static login(login: string, password: string): User | null {
	// 	const users: User[] = this.getAllUsers()
	// 	const user = users.find((u) => u.login === login && u.password === password)
	// 	if (user) {
	// 		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user))
	// 		return user
	// 	}
	// 	return null
	// }

	static logout(): void {
		localStorage.removeItem(this.STORAGE_KEY)
	}
}

export default UserService
