import React from 'react';
import Note from './SingleNote';
import { Grid } from '@mui/material';

import { useSelector } from 'react-redux';
// help us to reterive tha data from global store

const Notes = ({setCurrentId}) => {
  const notes = useSelector((state) => state.notesReducer);
  // console.log(notes)
  return (
      <Grid container alignItems="stretch" spacing={3}>
        {notes.map((note) => (
          <Grid key={note._id} item xs={12} sm={6} md={6}>
            <Note note={note} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
  );
};

export default Notes