import React, { useState,useEffect } from 'react'
import { TextField, Button, Paper,Typography } from '@mui/material';
import { createNote, updateNote } from '../actions/notes'
import { useDispatch, useSelector } from 'react-redux';

const Form = ({ setCurrentId, currentId }) => {

    const [noteData, setNoteData] = useState({ title: '', message: '' });
    const dispatch = useDispatch();
    const note = useSelector((state)=> currentId? state.notesReducer.find((e)=> e._id === currentId):null)

    useEffect(()=>{
      if(note) setNoteData(note);
    },[note])
     
    const clear = () => {
        setCurrentId(0);
        setNoteData({  title: '', message: ''});
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updateNote(currentId, noteData))
            clear()
        } else {
            dispatch(createNote(noteData));
            clear()
        }
    }

    return (

        <Paper style={{padding:'1rem'}}>
            <form autoComplete="off" noValidate onSubmit={handleSubmit} sx={{display:'flex',flexWrap:'wrap',justifyContent: 'center'}}>
                <Typography variant="h6">{currentId ? `Editing : ${noteData.title}` : 'Creating a Memory'}</Typography>

                <TextField name="title" variant="outlined" label="Title" fullWidth value={noteData.title}
                    onChange={(e) => setNoteData({ ...noteData, title: e.target.value })} />

                <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4}
                    value={noteData.message} onChange={(e) => setNoteData({ ...noteData, message: e.target.value })} />

                <Button variant="contained" color="primary" size="large" type="submit" fullWidth style={{marginBottom:'10px'}}>Submit</Button>
                <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form