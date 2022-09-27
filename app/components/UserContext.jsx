import React, {useContext, useState} from 'react'

const UserContext = React.createContext()
const UpdateUserContext = React.createContext()

export function useUserContext() {
	return useContext(UserContext)
}

export function updateUser() {
	return useContext(UpdateUserContext)
}

export function UserProvider({children}) {
	const [user, setUser] = useState({})

	return (
		<UserContext.Provider value={user}>
			<UpdateUserContext.Provider value={setUser}>
				{children}
			</UpdateUserContext.Provider>
		</UserContext.Provider>
	)
}
