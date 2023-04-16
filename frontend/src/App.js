import React,{useEffect,useState} from 'react'
import { useDispatch } from 'react-redux';
import { getNotes } from './actions/notes';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import Notes from './components/AllNotes';
import Form from './components/Form';


const App = () => {
  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, [currentId,dispatch]);

  return (
    <Container maxWidth="lg">
    <AppBar position="static" color="inherit">
      <Typography variant="h2" align="center">Note Making</Typography>
    </AppBar>
    <Grow in>
      <Container>
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Notes setCurrentId={setCurrentId}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  </Container>
  )
}

export default App