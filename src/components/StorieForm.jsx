import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createStorie } from '../features/stories/storieSlice'

function StorieForm() {
  const [titre, setTitre] = useState('')
const [description, setDescription] = useState('')
const [duree, setDuree] = useState('')
const [code, setCode] = useState('')
const [couleur, setCouleur] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createStorie({ titre,description,duree,code,couleur }))
    setTitre('')
    setDescription('')
    setDuree('')
    setCode('')
    setCouleur('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='titre'>Titre</label>
          <input
            type='text'
            name='titre'
            id='titre'
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            name='description'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='duree'>Durée</label>
          <input
            type='number'
            name='duree'
            id='duree'
            value={duree}
            onChange={(e) => setDuree(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='code'>Code</label>
          <input
            type='number'
            name='code'
            id='code'
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='couleur'>Couleur</label>
          <input
            type='text'
            name='couleur'
            id='couleur'
            value={couleur}
            onChange={(e) => setCouleur(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Storie
          </button>
        </div>
      </form>
    </section>
  )
}

export default StorieForm
