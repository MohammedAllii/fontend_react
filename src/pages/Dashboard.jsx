import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getStories, reset } from '../features/stories/storieSlice'
import Carte from '../components/carte'
function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { isError, message } = useSelector(
    (state) => state.stories
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getStories())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])



  return (
    <>
      <div>
        <h1><span style={{color:"red"}}>Welcome</span> {user && user.name}<span style={{color:"red"}}> To Emploi</span></h1>
        <p style={{color:"burlywood",fontSize:"40px",fontWeight:"bold"}}>Emploi Dashboard</p>
      </div>
      <Carte />
  
    </>
  )
}

export default Dashboard
