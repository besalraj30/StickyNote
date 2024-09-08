import { useState } from 'react'
import './App.css'
import Notes from './components/Notes'

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || [
    {
      id: 0,
      text: "Note 1"
    },
    {
      id: 1,
      text: "Note 2"
    }
  ]);

  const [text, setText] = useState('');

  return (
    <>
      <div style={{
        backgroundColor: "revert",
        border: "none",
        width: "200px",
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "auto",
        position: "relative"
      }}>
        <input placeholder='Input text content for new note' value={text} onChange={(e) => setText(e.target.value)}/> 
        <button onClick={() => {setNotes([...notes,
          {id: notes.length, text: text}
        ]
          )
          setText('')}}>Add Note</button>
      </div>

      <Notes notes={notes} setNotes={setNotes} />
    </>
  )
}

export default App
