import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = '/stories/'

// Create new storie
const createStorie = async (storieData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, storieData, config)
  if(response){
    toast.success("Ajout storie avec succees")
  }


  return response.data
}

// Get user stories
const getStories = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}


const storieService = {
  createStorie,
  getStories,
}

export default storieService
