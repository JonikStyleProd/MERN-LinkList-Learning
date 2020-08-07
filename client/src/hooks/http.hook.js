import { useState, useCallback } from "react";

//inside this Hook we cheacking alone what loading and error
export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true)
    try {
        //if we work with JSON we must sent in network {we are using JSON}
        //if we have a body we using this headers { headers['Content-Type'] = 'application/json'; }
        if (body) {
          body = JSON.stringify(body)
          headers['Content-Type'] = 'application/json'
        }
  
        const response = await fetch(url, {method, body, headers})
        const data = await response.json()
  
        if (!response.ok) {
          throw new Error(data.message || 'Что-то пошло не так')
        }
  
        setLoading(false)
  
        return data
      } catch (e) {
        setLoading(false)
        setError(e.message)
        throw e
      }
    }, [])
  
    const clearError = useCallback(() => setError(null), [])
  
    return { loading, request, error, clearError }
  }
