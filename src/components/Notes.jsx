import { createRef, useEffect, useRef } from "react";
import Note from "./Note";
const Notes = ({notes, setNotes}) => {

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

        const updatedNotes = (notes.map((note) => {
            const savedNote = savedNotes.find((n) => n.id === note.id);
            if(savedNote) {
                return {
                    ...note, position: savedNote?.position
                }
            } else {
                const position = determinePosition();
                return {...note, position};
            }
        }));

        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));

    }, [notes.length])

    const noteRefs = useRef([]);

    const determinePosition = () =>{
        const maxX = window.innerWidth - 250;
        const maxY = window.innerHeight - 250;

        return {
            x: Math.floor(Math.random() * maxX),
            y: Math.floor(Math.random() * maxY)
        }
    }

    const handleDragStart = (note, e) => {
        const id = note.id;
        const noteRef = noteRefs.current[id].current;
        const initialPos = note;
        const rect = noteRef.getBoundingClientRect();
        const offsetX = e.clientX-rect.left;
        const offsetY = e.clientY-rect.top;

        const handleMouseMove = (e) => {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;
            noteRef.style.left = `${newX}px`;
            noteRef.style.top = `${newY}px`;
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);

            const finalRect = noteRef.getBoundingClientRect();

            const newPosition = {x: finalRect.left, y: finalRect.top};

            if(checkForOverlap(id)) {
                noteRef.style.left = `${initialPos.position.x}px`;
                noteRef.style.top = `${initialPos.position.y}px`;
            } else {
                updateNotePosition(id, newPosition);
            }

        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        const checkForOverlap = (id) => {
            const currentNoteRef = noteRefs.current[id].current;
            const currentRect = currentNoteRef.getBoundingClientRect();

            return notes.some((note) => {
                if(note.id == id) return false;

                const otherNoteRef = noteRefs.current[note.id].current;
                const otherNodeRect = otherNoteRef.getBoundingClientRect();

                const overlap = !(currentRect.right < otherNodeRect.left || currentRect.left > otherNodeRect.right || currentRect.bottom < otherNodeRect.top || currentRect.top > otherNodeRect.bottom);
                return overlap;
            })

        }

        const updateNotePosition = (id, newPosition) => {
            const updatedNotes = notes.map((note) => {
                return note.id === id ? {...note, position: newPosition} : note;
            });
            setNotes(updatedNotes);
            localStorage.setItem("notes", JSON.stringify(updatedNotes));
        }
    }

    return (
        <div>
            {notes.map((note) => {
                return <Note id={note.id} 
                    key={note.id}
                    ref={noteRefs.current[note.id] ? noteRefs.current[note.id] : (noteRefs.current[note.id] = createRef())}
                    position={note.position} 
                    content = {note.text}
                    onMouseDown = {(e) => handleDragStart(note, e)} />
            })}
        </div>
    )
}

export default Notes;