
// Hook for Authorization
import { useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

// callback function we can login here and logout
export const useAuth = () => {
    //the state that will be responsible for the token
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)

    //login method to log in the system
    //here we get jwtToken from the backend
    const login = useCallback( (jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        // we write to the localStorage - this is the basic browser API
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        }))
    }, [])

    //logout method to logout from the system
    // here we reset the setToken and setUserId and clear the localStorage
    const logout = useCallback( () => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    //When our application starts, we need it to check if there is data in LocalStorage
    // and so that it writes the data to the local state itself
    useEffect( () =>{
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token){
            login(data.token, data.userId)
        }
        setReady(true)
    }, [login])


    //returning 2 Methods and 2 parameters
    return {login, logout , token , userId, ready }
}