import React, {useContext, useState} from 'react'

const AuthContext = React.createContext()
const UpdateUserContext = React.createContext()

export function useAuthContext() {
  return useContext(AuthContext)
}

export function updateAuthContext() {
  return useContext(UpdateUserContext)
}

export function AuthProvider({children}) {
  const [jwt, setJwt] = useState('')

  return (
    <AuthContext.Provider value={jwt}>
      <UpdateUserContext.Provider value={setJwt}>
        {children}
      </UpdateUserContext.Provider>
    </AuthContext.Provider>
  )
}