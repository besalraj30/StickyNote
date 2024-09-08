import { useState } from 'react'
import './App.css'
import Notes from './components/Notes'

function App() {
  const [notes, setNotes] = useState([
    {
      id: 0,
      text: "Note 1"
    },
    {
      id: 1,
      text: "Note 2"
    }
  ])

  return (
    <>
      <input placeholder='Input text content for new note' /> 
      <button>Add Note</button>

      <Notes notes={notes} setNotes={setNotes} />
    </>
  )
}

export default App
