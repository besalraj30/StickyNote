import { forwardRef } from 'react';
import './note.css';

const Note = forwardRef(({position, content, ...props}, ref) => {
    return (
        <div 
        ref={ref}
        {...props}
        style={{
            top: `${position?.y}px`,
            left: `${position?.x}px`
        }}>
            <h1>📌{content}</h1>
        </div>
    )
})

export default Note;