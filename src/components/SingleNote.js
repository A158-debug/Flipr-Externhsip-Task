import React from 'react'
import { Card, CardActions, CardContent, Typography,Button } from '@mui/material';
import {deleteNote} from '../actions/notes';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


const Note = ({note,setCurrentId}) => {
  // console.log({note})
  const dispatch = useDispatch();
  return (
    <Card>
      <Typography  gutterBottom variant="h5" component="h2">Title : {note?.title}</Typography>
      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">Message</Typography>
        <Typography variant="body2" color="textSecondary" component="p">{note?.message}</Typography>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary" onClick={()=>setCurrentId(note._id)}><MoreHorizIcon fontSize="small" /> Update </Button>
        <Button size="small" color="primary" onClick={() => dispatch(deleteNote(note._id))}><DeleteIcon fontSize="small"  /> Delete</Button>
      </CardActions>
    </Card>
  )
}

export default Note