import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthUserQuery } from './api'
import { login } from './store/slices/authSlice'
import LoadingScreen from './pages/LoadingScreen'
import Router from './Router'

function App() {
  const dispatch  = useDispatch()

  const { data, isLoading } = useAuthUserQuery()

  useEffect(() => {
    if (data && !isLoading) dispatch(login(data))
  }, [isLoading])

  if (isLoading) return <LoadingScreen />

  return <Router />

}

export default App
