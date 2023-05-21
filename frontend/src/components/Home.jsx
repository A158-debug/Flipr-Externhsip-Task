import React,{useEffect,useState}  from 'react'
import { Container, Grow, Grid } from '@mui/material';

import { useDispatch } from 'react-redux';
import { getNotes } from '../actions/notes';

import Notes from './AllNotes';
import Form from './Form';

const Home = () => {

    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getNotes());
    }, [currentId,dispatch]);

    
    return (
        <>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Notes setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </>
    )
}

export default Home